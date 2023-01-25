import { StyledHome } from "./home.styles"
import { Carousel } from "../carousel/carousel"

/* eslint-disable-next-line */
export interface HomeProps {}
const titles = ["Books", "Notes"]

export function Home() {
    return (
        <StyledHome>
            {titles.map((title, index) => (
                <Carousel key={index} title={title} index={index} />
            ))}
        </StyledHome>
    )
}

export default Home
