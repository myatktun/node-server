import { useRef } from "react"
import { StyledSharedUiCarousel } from "./shared-ui-carousel.styles"
import { useQuery } from "react-query"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"

interface SharedUiCarouselProps {
    title: string
}

interface Item {
    name: string
}

export const SharedUiCarousel = (props: SharedUiCarouselProps) => {
    const sliderRef = useRef(document.createElement("div"))

    const moveSlider = (direction: string) => {
        if (direction === "right") {
            sliderRef.current.scrollLeft += sliderRef.current.offsetWidth
        } else {
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth
        }
    }

    const { isLoading, error, data } = useQuery(`${props.title.toLowerCase()}Data`, () =>
        fetch(`http://localhost:5001/v1/${props.title.toLowerCase()}?sort=dateAdded`).then((res) =>
            res.json()
        )
    )

    if (isLoading) return <div>"Loading..."</div>
    if (error) return <div>"Error..."</div>

    return (
        <StyledSharedUiCarousel>
            <span className="title">{props.title}</span>
            <div className="carousel">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => moveSlider("left")}
                />
                <div className="wrapper">
                    <div className="slider" ref={sliderRef}>
                        {data.results.map((item: Item) => (
                            <DefaultThumb key={item.name} title={props.title} item={item} />
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

interface DefaultThumbProps {
    title: string
    item: { name: string; author?: string }
}

const DefaultThumb = (props: DefaultThumbProps) => {
    if (props.title === "Books") {
        return (
            <div className="listItem">
                {props.item.name}
                {"\nAuthor: "}
                {props.item.author}
            </div>
        )
    }

    return <div className="listItem">{props.item.name}</div>
}

export default SharedUiCarousel
