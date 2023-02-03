import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { StyledDetail } from "./detail.styles"
import Book from "./book/book"
import Note from "./note/note"
import Author from "./author/author"
import CircularProgress from "@mui/material/CircularProgress"
import Error from "../error/error"

export const Detail = () => {
    const { title, id } = useParams()

    const fetchData = async () => {
        const res = await fetch(`${process.env.NX_API_URL}/${title}/${id}`)
        return res.json()
    }

    const { isLoading, error, data } = useQuery([`${id}`], fetchData)

    if (isLoading) {
        return (
            <StyledDetail>
                <div className="loader">
                    <CircularProgress />
                </div>
            </StyledDetail>
        )
    }

    if (error) {
        return (
            <StyledDetail>
                <Error />
            </StyledDetail>
        )
    }

    if (title === "books") {
        return (
            <StyledDetail>
                <Book data={data} title={title} />
            </StyledDetail>
        )
    }
    if (title === "notes") {
        return (
            <StyledDetail>
                <Note data={data} />
            </StyledDetail>
        )
    }
    if (title === "authors") {
        return (
            <StyledDetail>
                <Author data={data} title={title} />
            </StyledDetail>
        )
    }

    return <StyledDetail>{data}</StyledDetail>
}

export default Detail
