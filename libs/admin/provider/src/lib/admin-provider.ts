import { fetchUtils } from "react-admin"
import queryString from "query-string"

const apiUrl = "http://localhost:5002/v1"
const httpClient = fetchUtils.fetchJson

interface Params {
    pagination: { page: number; perPage: number }
    sort: { field: string; order: string }
    id: string
    data: { id: string }
    filter: { name: string }
}

const formatData = (data: [{ _id?: string }]) => {
    data.forEach((item) => {
        Object.assign(item, { id: item._id })["_id"]
        delete item._id
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
            search: params.filter.name,
        }

        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`

        const { json } = await httpClient(url)
        const data = formatData(json.results)
        return { data: data, total: json.total }
    },

    getOne: async (resource: string, params: Params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        const { json } = await httpClient(url)
        const data = formatData(json.results)[0]
        return { data }
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

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        })
        return {
            data: { ...params.data, id: json.id },
        }
    },

    update: async (resource: string, params: Params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            headers: new Headers({ authorization: "token" }),
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },

    updateMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json })),

    deleteMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
            body: JSON.stringify(params.data),
        })
        return { data: json }
    },
}
