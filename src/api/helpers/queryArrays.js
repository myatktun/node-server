const booksMainQuery = async (search, isGetSingleBook) => {
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
                $or: [
                    { book: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { isbn: Number(search) }
                ]
            }
        }
    )
}

const similarBooksQuery = async () => {
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

const relatedNotesQuery = async () => {
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

const bookNote = async () => {
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

const Books = async (mainQueryArray, search = '', isGetSingleBook) => {
    search = search.replace(/[+]/g, '\\W')
    const queryArray = mainQueryArray

    if (isGetSingleBook) {
        queryArray.unshift(await relatedNotesQuery())
        queryArray.unshift(await bookNote())
        queryArray.unshift(await similarBooksQuery())
    }

    queryArray.unshift(await booksMainQuery(search, isGetSingleBook))

    if (!search) {
        queryArray.at(-1)['$facet']['latest'] = [
            {
                $sort: { dateAdded: -1 }
            },
            {
                $limit: 1
            }
        ]
    }
    return queryArray
}

const Authors = async (mainQueryArray, author = '') => {
    const queryArray = mainQueryArray
    queryArray.unshift(
        {
            $group: {
                _id: `$author`,
                books: { $addToSet: '$book' }
            }
        },
        {
            $match: {
                _id: { $regex: author, $options: 'i' }
            }
        }
    )
    return queryArray
}

const Categories = async (mainQueryArray, category = '') => {
    const queryArray = mainQueryArray
    queryArray.unshift(
        {
            $group: {
                _id: `$category`,
                books: { $addToSet: '$book' }
            }
        },
        {
            $match: {
                _id: { $regex: category, $options: 'i' }
            }
        }
    )
    return queryArray
}

const Notes = async (mainQueryArray, note = '') => {
    note = note.replace(/[+]/g, '\\W')
    const queryArray = mainQueryArray
    queryArray.unshift(
        {
            $match: {
                name: { $regex: note, $options: 'i' }
            }
        }
    )
    return queryArray
}

export { Books, Authors, Categories, Notes }
