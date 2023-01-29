import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { StyledDetail } from "./detail.styles"
import Book from "./book/book"

export const Detail = () => {
    const { title, id } = useParams()

    const fetchData = async () => {
        const res = await fetch(`${process.env.NX_API_URL}/${title}/${id}`)
        return res.json()
    }

    const { isLoading, error, data } = useQuery([`${id}`], fetchData)

    if (isLoading) return <StyledDetail>"Loading..."</StyledDetail>
    if (error) return <StyledDetail>"Error..."</StyledDetail>

    return title === "books" ? (
        <StyledDetail>
            <Book data={data} title={title} />
        </StyledDetail>
    ) : (
        <StyledDetail>
            <h1>Not Books</h1>
        </StyledDetail>
    )
}

export default Detail
