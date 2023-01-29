import styled from "styled-components"
import Thumb from "../../thumb/thumb"
import { Book as IBook } from "@projectx/api-interfaces"
import { Carousel } from "../../carousel/carousel"

interface BookProps {
    data: {}
    title: string
}

const StyledBook = styled.div`
    display: flex;
    flex-direction: column;
`

const Book = ({ data, title }: BookProps) => {
    return (
        <StyledBook>
            <Info data={data.results[0]} title={title} />
            <Carousel index={0} title={"Similar Books"} data={data.results[0].similar} />
            {data.results[0].relatedNotes.length !== 0 && (
                <Carousel index={1} title={"Related Notes"} data={data.results[0].relatedNotes} />
            )}
        </StyledBook>
    )
}

interface InfoProps {
    data: IBook
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

export default Book
