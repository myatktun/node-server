import { Books, Authors, Categories, Notes } from "./queryArrays"
import { Request } from "express"
import { PipelineStage } from "mongoose"

const createQueryArray = async (req: Request, limit: number, skip: number): Promise<PipelineStage[]> => {
    const { route, query, params } = req
    const mainQueryArray: PipelineStage[] = [
        {
            $facet: {
                total: [
                    {
                        $count: "total"
                    }
                ],
                data: [
                    {
                        $skip: skip
                    },
                    {
                        $limit: limit
                    }
                ]
            }
        }
    ]
    if (query.sort) {
        const enum sortOrder { ascending = -1, descending }
        mainQueryArray.unshift(
            {
                $sort: {
                    [`${query.sort}`]: sortOrder.ascending
                }
            }
        )
    }

    if (typeof query.search !== "string") {
        throw new Error()
    }
    if (route.path.includes("/books")) {
        if (route.path.includes("/authors")) {
            return await Authors(mainQueryArray, query.search || params.author)
        } else if (route.path.includes("/categories")) {
            return await Categories(mainQueryArray, query.search || params.category)
        }
        return await Books(mainQueryArray, query.search || params.book, Object.keys(params).length)
    }
    return await Notes(mainQueryArray, query.search || params.note, Object.keys(params).length)
}

export default createQueryArray
