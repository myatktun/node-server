import { Link as RouterLink } from "react-router-dom"
import StyledBook from "./book.styles"
import Thumb from "../../thumb/thumb"
import { Book as IBook, BookResponse } from "@projectx/shared/interface"
import { Carousel } from "../../carousel/carousel"
import Link from "@mui/material/Link"

interface BookProps {
    data: BookResponse
    title: string
}

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
                <ul>
                    <li>
                        Author:
                        <Link component={RouterLink} to={`/authors/${data.author}`}>
                            {" "}
                            {data.author}
                        </Link>
                    </li>
                    <li>
                        Category:
                        <Link component={RouterLink} to={`/categories/${data.category}`}>
                            {" "}
                            {data.category}
                        </Link>
                    </li>
                    <li>Status: {data.status}</li>
                </ul>
            </div>
        </div>
    )
}

export default Book
