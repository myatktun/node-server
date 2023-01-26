import { useQuery } from "react-query"
import { StyledPage } from "./page.styles"
import { Grid } from "../grid/grid"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"

interface PageProps {
    title: string
}

export function Page(props: PageProps) {
    const { isLoading, error, data } = useQuery(`${props.title.toLowerCase()}Data`, () =>
        fetch(`http://localhost:5001/v1/${props.title.toLowerCase()}?sort=dateAdded`).then((res) =>
            res.json()
        )
    )

    if (isLoading) return <div>"Loading..."</div>
    if (error) return <div>"Error..."</div>

    return (
        <StyledPage>
            <Grid title={props.title} data={data} />
            <div className="slider">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => moveSlider("left")}
                />
                {data.total_pages}
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => moveSlider("right")}
                />
            </div>
        </StyledPage>
    )
}

export default Page
