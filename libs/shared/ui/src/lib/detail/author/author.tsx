import styled from "styled-components"
import Thumb from "../../thumb/thumb"
import { Author as IAuthor, AuthorResponse } from "@projectx/shared/interface"

interface AuthorProps {
    data: AuthorResponse
    title: string
}

const StyledAuthor = styled.div`
    color: pink;
`

const Author = ({ data, title }: AuthorProps) => {
    return (
        <StyledAuthor>
            <Info data={data.results[0]} title={title} />
            {/* {data.results[0].relatedNotes.length !== 0 && ( */}
            {/*     <Carousel index={1} title={"Related Notes"} data={data.results[0].relatedNotes} /> */}
            {/* )} */}
        </StyledAuthor>
    )
}

interface InfoProps {
    data: IAuthor
    title?: string
}

const Info = ({ data, title }: InfoProps) => {
    return (
        <div className="detail">
            <Thumb title={`${title}`} item={data} />
        </div>
    )
}

export default Author
