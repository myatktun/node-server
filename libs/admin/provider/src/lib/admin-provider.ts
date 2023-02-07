import { fetchUtils } from "react-admin"
import queryString from "query-string"
import { Book } from "@projectx/shared/interface"

const apiUrl = "http://localhost:5002/v1"
const httpClient = fetchUtils.fetchJson

interface Params {
    pagination: { page: number; perPage: number }
    sort: { field: string; order: string }
    id: string
}

const formatData = (data: [Book]) => {
    data.forEach((book) => {
        Object.assign(book, { id: book._id })["_id"]
        delete book._id
    })
    return data
}

export const dataProvider = {
    getList: async (resource: string, params: Params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
            sort: field,
            limit: perPage,
            page: page,
            sortOrder: order === "DESC" ? order : undefined,
        }

        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`

        const { json } = await httpClient(url)
        const data = formatData(json.results)
        return { data: data, total: json.total }
    },

    getOne: async (resource: string, params: Params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        console.log(url)
        const { json } = await httpClient(url)
        console.log(json)
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`
        return httpClient(url).then(({ json }) => ({ data: json }))
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }))
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },
}
