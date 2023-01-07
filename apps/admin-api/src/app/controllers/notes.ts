import { createProxyMiddleware } from "http-proxy-middleware"

if (!process.env.MAIN_API) {
    throw new Error("Invalid API to forward")
}

export const getNotes = createProxyMiddleware({
    target: process.env.MAIN_API,
    changeOrigin: true,
})
