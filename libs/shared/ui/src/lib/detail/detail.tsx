import { useQuery } from "react-query"
import { StyledDetail } from "./detail.styles"
import Thumb from "../thumb/thumb"
import { Carousel } from "../carousel/carousel"
import { useParams } from "react-router-dom"

export const Detail = () => {
    const { id } = useParams()

    const fetchData = async () => {
        const res = await fetch(`${process.env.NX_API_URL}/books/${id}`)
        return res.json()
    }

    const { isLoading, error, data } = useQuery([`${id}`], fetchData)

    if (isLoading) return <StyledDetail>"Loading..."</StyledDetail>
    if (error) return <StyledDetail>"Error..."</StyledDetail>

    return (
        <StyledDetail>
            <Info data={data.results[0]} />
            <Carousel index={0} title={"Similar Books"} data={data.results[0].similar} />
            {data.results[0].relatedNotes.length !== 0 && (
                <Carousel index={1} title={"Related Notes"} data={data.results[0].relatedNotes} />
            )}
        </StyledDetail>
    )
}

interface InfoProps {
    data: {
        _id: string
        name: string
        author: string
        category: string
        similar: [{ name: string }]
    }
}

const Info = ({ data }: InfoProps) => {
    return (
        <div className="detail">
            <Thumb title="books" item={data} />
            <div className="info">
                <li className="title">{data.name}</li>
                <li>{data.author}</li>
                <li>{data.category}</li>
            </div>
        </div>
    )
}

export default Detail
