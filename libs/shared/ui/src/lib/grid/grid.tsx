import { StyledGrid } from "./grid.styles"
import Thumb from "../thumb/thumb"
import Error from "../error/error"

export interface GridProps {
    title: string
    data: Array<{ name: string }>
}

interface Item {
    name: string
}

const Grid = ({ title, data }: GridProps) => {
    if (!data) {
        return <Error />
    }

    return (
        <StyledGrid>
            {data.map((item: Item) => (
                <Thumb key={item.name} title={title} item={item} />
            ))}
        </StyledGrid>
    )
}

export default Grid
