import { PipelineStage } from "mongoose"

const booksMainQuery = async (search: string, isGetSingleBook: number): Promise<PipelineStage.Match> => {
    if (isGetSingleBook) {
        return (
            {
                $match: { book: search }
            }
        )
    }

    return (
        {
            $match: {
                // $or: [
                //     { book: { $regex: search, $options: "i" } },
                //     { author: { $regex: search, $options: "i" } },
                //     { category: { $regex: search, $options: "i" } },
                //     { isbn: Number(search) }
                // ]
                $or: [
                    {
                        $expr: {
                            $regexFind: {
                                input: "$book",
                                regex: search,
                                options: "i"
                            }
                        }
                    },
                    {
                        $expr: {
                            $regexFind: {
                                input: "$author",
                                regex: search,
                                options: "i"
                            }
                        }
                    },
                    {
                        $expr: {
                            $regexFind: {
                                input: "$category",
                                regex: search,
                                options: "i"
                            }
                        }
                    }
                ]
            }
        }
    )
}

const similarBooksQuery = async (): Promise<PipelineStage.Lookup> => {
    return (
        {
            $lookup: {
                from: "books",
                let: { book: "$book", category: "$category" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $ne: ["$$book", "$book"] },
                                    { $eq: ["$$category", "$category"] }
                                ]
                            }
                        }
                    }
                ],
                as: "similar"
            }
        }
    )
}

const relatedNotesQuery = async (): Promise<PipelineStage.Lookup> => {
    return (
        {
            $lookup: {
                from: "notes",
                let: { book: "$book", category: "$category" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$$category", "$category"] },
                                    { $ne: ["$$book", "$name"] }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            data: 0
                        }
                    }
                ],
                as: "relatedNotes"
            }
        }
    )
}

const bookNote = async (): Promise<PipelineStage.Lookup> => {
    return (
        {
            $lookup: {
                from: "notes",
                let: { book: "$book" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$$book", "$name"]
                            }
                        }
                    },
                    {
                        $project: {
                            data: 0
                        }
                    }
                ],
                as: "notes"
            }
        }
    )
}

const Books = async (mainQueryArray: PipelineStage[], search = "", isGetSingleBook: number): Promise<PipelineStage[]> => {
    search = search.replace(/[+]/g, "\\W")
    const queryArray = mainQueryArray

    if (isGetSingleBook) {
        queryArray.unshift(await relatedNotesQuery())
        queryArray.unshift(await bookNote())
        queryArray.unshift(await similarBooksQuery())
    }

    queryArray.unshift(await booksMainQuery(search, isGetSingleBook))

    // if (!search) {
    //     queryArray.at(-1)["$facet"]["latest"] = [
    //         {
    //             $sort: { dateAdded: -1 }
    //         },
    //         {
    //             $limit: 1
    //         }
    //     ]
    // }
    return queryArray
}

const Authors = async (mainQueryArray: PipelineStage[], author = ""): Promise<PipelineStage[]> => {
    const queryArray = mainQueryArray
    queryArray.unshift(
        {
            $group: {
                _id: "$author",
                books: { $addToSet: "$book" }
            }
        },
        {
            $match: {
                // _id: { $regex: author, $options: "i" }
                $expr: {
                    $regexFind: {
                        input: "$_id",
                        regex: author,
                        options: "i"
                    }
                }
            }
        }
    )
    return queryArray
}

const Categories = async (mainQueryArray: PipelineStage[], category = ""): Promise<PipelineStage[]> => {
    const queryArray = mainQueryArray
    queryArray.unshift(
        {
            $group: {
                _id: "$category",
                books: { $addToSet: "$book" }
            }
        },
        {
            $match: {
                // _id: { $regex: category, $options: "i" }
                $expr: {
                    $regexFind: {
                        input: "$_id",
                        regex: category,
                        options: "i"
                    }
                }
            }
        }
    )
    return queryArray
}

const Notes = async (mainQueryArray: PipelineStage[], note = "", isGetSingleNote: number): Promise<PipelineStage[]> => {
    note = note.replace(/[+]/g, "\\W")
    const queryArray = mainQueryArray

    if (isGetSingleNote) {
        queryArray.unshift(
            {
                $match: { name: note }
            },
        )
        return queryArray
    }

    // queryArray.unshift(
    //     {
    //         $match: {
    //             $or: [
    //                 { name: { $regex: note, $options: "i" } },
    //                 { category: { $regex: note, $options: "i" } },
    //             ]
    //         }
    //     },
    //     {
    //         $project: {
    //             data: 0
    //         }
    //     }
    // )
    return queryArray
}

export { Books, Authors, Categories, Notes }
