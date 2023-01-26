import { StyledGrid } from "./grid.styles"
import Thumb from "../thumb/thumb"

export interface GridProps {
    title: string
    data: Array<any>
}

interface Item {
    name: string
}

export function Grid(props: GridProps) {
    return (
        <StyledGrid>
            {props.data.results.map((item: Item) => (
                <Thumb key={item.name} title={props.title} item={item} />
            ))}
        </StyledGrid>
    )
}

export default Grid
