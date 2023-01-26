import { StyledHome } from "./home.styles"
import { Carousel } from "../carousel/carousel"

interface HomeProps {
    titles: Array<string>
}

export function Home({ titles }: HomeProps) {
    return (
        <StyledHome>
            {titles.map((title, index) => (
                <Carousel key={index} title={title} index={index} />
            ))}
        </StyledHome>
    )
}

export default Home
