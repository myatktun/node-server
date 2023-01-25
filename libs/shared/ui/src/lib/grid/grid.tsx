import { useQuery } from "react-query"
import { StyledGrid } from "./grid.styles"
import Thumb from "../thumb/thumb"

export interface GridProps {
    title: string
}

interface Item {
    name: string
}

export function Grid(props: GridProps) {
    const { isLoading, error, data } = useQuery(`${props.title.toLowerCase()}Data`, () =>
        fetch(`http://localhost:5001/v1/${props.title.toLowerCase()}?sort=dateAdded`).then((res) =>
            res.json()
        )
    )

    if (isLoading) return <div>"Loading..."</div>
    if (error) return <div>"Error..."</div>

    return (
        <StyledGrid>
            {data.results.map((item: Item) => (
                <Thumb key={item.name} title={props.title} item={item} />
            ))}
        </StyledGrid>
    )
}

export default Grid
