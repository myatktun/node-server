import { fetchUtils, AuthProvider } from "react-admin"

const apiUrl = "http://localhost:5002/v1"
const httpClient = fetchUtils.fetchJson

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const { status, json } = await httpClient(`${apiUrl}/login`, {
            method: "POST",
            body: JSON.stringify({ name: username, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        })
        if (status < 200 || status > 300) {
            throw new Error("error")
        }
        localStorage.setItem("username", json.name)
        localStorage.setItem("token", json.token)
        return Promise.resolve()
    },

    logout: () => {
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        return Promise.resolve()
    },

    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            return Promise.reject()
        }

        return Promise.resolve()
    },

    checkAuth: () => {
        return localStorage.getItem("username") ? Promise.resolve() : Promise.reject()
    },

    getPermissions: () => {
        return Promise.resolve()
    },
}
