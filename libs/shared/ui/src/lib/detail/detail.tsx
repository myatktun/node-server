import { useQuery } from "react-query"
import { StyledDetail } from "./detail.styles"
import Thumb from "../thumb/thumb"
import { Carousel } from "../carousel/carousel"
import { useParams } from "react-router-dom"
import { Book } from "@projectx/api-interfaces"

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
            <Info data={data.results[0]} title={title} />
            <Carousel index={0} title={"Similar Books"} data={data.results[0].similar} />
            {data.results[0].relatedNotes.length !== 0 && (
                <Carousel index={1} title={"Related Notes"} data={data.results[0].relatedNotes} />
            )}
        </StyledDetail>
    ) : (
        <StyledDetail>
            <Info data={data.results[0]} title={title} />
        </StyledDetail>
    )
}

interface InfoProps {
    data: Book
    title?: string
}

const Info = ({ data, title }: InfoProps) => {
    return (
        <div className="detail">
            <Thumb title={`${title}`} item={data} />
            <div className="info">
                {data.olid !== "unknown" ? (
                    <a
                        href={`https://openlibrary.org/books/${data.olid}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <li className="title">{data.name}</li>
                    </a>
                ) : (
                    <li className="title">{data.name}</li>
                )}
                <li>{data.author}</li>
                <li>{data.category}</li>
                <li>
                    {"Status: "}
                    {data.read}
                </li>
            </div>
        </div>
    )
}

export default Detail
