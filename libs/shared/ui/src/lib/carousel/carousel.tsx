import { Link } from "react-router-dom"
import { useRef } from "react"
import { StyledSharedUiCarousel } from "./carousel.styles"
import { useQuery } from "react-query"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import Thumb from "../thumb/thumb"

interface SharedUiCarouselProps {
    title: string
    index: number
}

interface Item {
    name: string
}

export const Carousel = ({ title, index }: SharedUiCarouselProps) => {
    const sliderRef = useRef(document.createElement("div"))
    const even = index % 2 === 0

    const moveSlider = (direction: string) => {
        if (direction === "right") {
            sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
        } else {
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
        }
    }

    const { isLoading, error, data } = useQuery(`${title.toLowerCase()}Data`, () =>
        fetch(`${process.env.NX_API_URL}/${title.toLowerCase()}?sort=dateAdded`).then((res) =>
            res.json()
        )
    )

    if (isLoading) return <div>"Loading..."</div>
    if (error) return <div>"Error..."</div>

    return (
        <StyledSharedUiCarousel style={{ backgroundColor: even ? "#282828" : "#1d2021" }}>
            <Link to={`${title}`} className="title">
                {title}
            </Link>
            <div className="carousel">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => moveSlider("left")}
                />
                <div className="wrapper">
                    <div className="slider" ref={sliderRef}>
                        {data.results.map((item: Item) => (
                            <Thumb key={item.name} title={title} item={item} />
                        ))}
                    </div>
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => moveSlider("right")}
                />
            </div>
        </StyledSharedUiCarousel>
    )
}

export default Carousel
