import { StyledGrid } from "./grid.styles"
import Thumb from "../thumb/thumb"

export interface GridProps {
    title: string
    data: { results: Array<{ name: string }> }
}

interface Item {
    name: string
}

export function Grid({ title, data }: GridProps) {
    return (
        <StyledGrid>
            {data.results.map((item: Item) => (
                <Thumb key={item.name} title={title} item={item} />
            ))}
        </StyledGrid>
    )
}

export default Grid
