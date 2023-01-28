import { Link } from "react-router-dom"
import { StyledSharedUiThumb, Image, Wrapper, Text } from "./thumb.styles"

interface ThumbProps {
    title: string
    item: { _id?: string; name: string; author?: string; olid?: string }
}

const Thumb = ({ title, item }: ThumbProps) => {
    if (title.toLowerCase().includes("books")) {
        return (
            <StyledSharedUiThumb className="listItem">
                <Link to={`/books/${item._id}`} style={{ textDecoration: "none" }}>
                    {item.olid !== "unknown" ? (
                        <Image
                            src={`https://covers.openlibrary.org/b/olid/${item.olid}-M.jpg`}
                            alt={`${item.name}`}
                        />
                    ) : (
                        <DefaultThumb title={item.name} author={item.author} />
                    )}
                </Link>
            </StyledSharedUiThumb>
        )
    }

    return (
        <StyledSharedUiThumb className="listItem">
            <Link to={`/notes/${item._id}`}>
                <DefaultThumb title={item.name} />
            </Link>
        </StyledSharedUiThumb>
    )
}

const DefaultThumb = ({ title, author }: DefaultThumbProps) => {
    return (
        <Wrapper>
            <Text>
                <p>{title}</p>
                {"\n"}
                <p>{author}</p>
            </Text>
        </Wrapper>
    )
}

interface DefaultThumbProps {
    title: string
    author?: string
}

export default Thumb
