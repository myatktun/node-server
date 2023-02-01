import { Link } from "react-router-dom"
import { useRef } from "react"
import { StyledSharedUiCarousel } from "./carousel.styles"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import { Book, Note } from "@projectx/shared/interface"
import Thumb from "../thumb/thumb"

interface SharedUiCarouselProps {
    title: string
    index: number
    data: Book[] | Note[]
}

interface Item {
    _id?: string
    name: string
}

export const Carousel = ({ title, index, data }: SharedUiCarouselProps) => {
    const sliderRef = useRef(document.createElement("div"))
    const even = index % 2 === 0

    const moveSlider = (direction: string) => {
        if (direction === "right") {
            sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
        } else {
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
        }
    }

    if (!data) {
        return (
            <StyledSharedUiCarousel style={{ backgroundColor: even ? "#282828" : "#3c3836" }}>
                <Link to={`${title}`} className="title">
                    {title}
                </Link>
                <div className="carousel">
                    <ArrowBackIosOutlined
                        className="sliderArrow left"
                        onClick={() => moveSlider("left")}
                    />
                    <div className="wrapper">"Error"</div>
                    <ArrowForwardIosOutlined
                        className="sliderArrow right"
                        onClick={() => moveSlider("right")}
                    />
                </div>
            </StyledSharedUiCarousel>
        )
    }

    return (
        <StyledSharedUiCarousel style={{ backgroundColor: even ? "#282828" : "#3c3836" }}>
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
                        {data.map((item: Item) => (
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
