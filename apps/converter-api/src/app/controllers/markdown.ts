import { Request, Response } from "express"
import { marked } from "marked"
import DOMPurify from "isomorphic-dompurify"
import fetch from "node-fetch"
import hljs from "highlight.js"

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext"
        return hljs.highlight(code, { language }).value
    },
    langPrefix: "hljs language-",
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false,
})

export const convertMD = async (req: Request, res: Response) => {
    const response = await fetch(`http://storage/v1/notes/${req.body.file}`)
    const data = (await response.json()).data

    const md = DOMPurify.sanitize(
        marked.parse(data.replace(`/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/`, ""))
    )

    return res.send({ data: md })
}
