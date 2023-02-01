import StyledNote from "./note.styles"
import "./gruvbox-dark-hard.css"

/* eslint-disable-next-line */
interface NoteProps {
    data: { results: string }
}

export function Note({ data }: NoteProps) {
    return <StyledNote dangerouslySetInnerHTML={{ __html: data.results }}></StyledNote>
}

export default Note
