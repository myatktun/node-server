import { Link as RouterLink } from "react-router-dom"
import { StyledSharedUiThumb, Image, Wrapper, Text } from "./thumb.styles"

interface ThumbProps {
    title: string
    item: { _id?: string; name: string; author?: string; olid?: string }
}

const Thumb = ({ title, item }: ThumbProps) => {
    if (item.olid) {
        return (
            <StyledSharedUiThumb className="listItem">
                <RouterLink to={`/books/${item._id}`} style={{ textDecoration: "none" }}>
                    {item.olid !== "unknown" ? (
                        <Image
                            src={`https://covers.openlibrary.org/b/olid/${item.olid}-M.jpg`}
                            alt={`${item.name}`}
                        />
                    ) : (
                        <DefaultThumb title={item.name} author={item.author} />
                    )}
                </RouterLink>
            </StyledSharedUiThumb>
        )
    }

    return (
        <StyledSharedUiThumb className="listItem">
            <RouterLink to={`/${title.toLowerCase()}/${item._id}`}>
                <DefaultThumb title={item.name} />
            </RouterLink>
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
