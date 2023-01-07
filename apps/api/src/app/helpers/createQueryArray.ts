import { Books, Authors, Categories, Notes } from "./queryArrays"
import { Request } from "express"
import { PipelineStage } from "mongoose"

const createQueryArray = async (
    req: Request,
    limit: number,
    skip: number
): Promise<PipelineStage[]> => {
    const { route, query, params } = req
    const mainQueryArray: PipelineStage[] = [
        {
            $facet: {
                total: [
                    {
                        $count: "total",
                    },
                ],
                data: [
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ],
            },
        },
    ]

    if (query.sort) {
        const enum sortOrder {
            ascending = 1,
            descending = -1,
        }
        mainQueryArray.unshift({
            $sort: {
                [`${query.sort}`]: query.sortOrder
                    ? sortOrder.descending
                    : sortOrder.ascending,
            },
        })
    }

    if (route.path.includes("/books")) {
        return await Books(
            mainQueryArray,
            <string>query.search || params.book,
            Object.keys(params).length
        )
    } else if (route.path.includes("/authors")) {
        return await Authors(
            mainQueryArray,
            <string>query.search || params.author
        )
    } else if (route.path.includes("/categories")) {
        return await Categories(
            mainQueryArray,
            <string>query.search || params.category
        )
    }
    return await Notes(
        mainQueryArray,
        <string>query.search || params.note,
        Object.keys(params).length
    )
}

export default createQueryArray
