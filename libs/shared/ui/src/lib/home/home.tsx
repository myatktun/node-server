import { useQueries } from "react-query"
import { StyledHome } from "./home.styles"
import { Carousel } from "../carousel/carousel"

interface HomeProps {
    titles: Array<string>
}

export function Home({ titles }: HomeProps) {
    const fetchData = async (title: string) => {
        const res = await fetch(`${process.env.NX_API_URL}/${title.toLowerCase()}?sort=dateAdded`)
        return res.json()
    }

    const all = useQueries(
        titles.map((title) => {
            return {
                queryKey: [title],
                queryFn: () => fetchData(title),
            }
        })
    )

    if (all.some((e) => e.isLoading)) return <div>"Loading..."</div>
    if (all.some((e) => e.error)) return <div>"Error..."</div>

    return (
        <StyledHome>
            {all.map((i, index) => (
                <Carousel key={index} title={titles[index]} data={i.data.results} index={index} />
            ))}
        </StyledHome>
    )
}

export default Home
