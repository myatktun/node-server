import { useRef } from "react"
import { StyledSharedUiCarousel } from "./shared-ui-carousel.styles"
import { useQuery } from "react-query"
import { Book, Author } from "@projectx/api-interfaces"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"

/* eslint-disable-next-line */
export interface SharedUiCarouselProps {
    title: string
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
                    {/* <Books sliderRef={sliderRef} /> */}
                    {props.title.toLowerCase() === "books" ? (
                        <div className="slider" ref={sliderRef}>
                            {data.results.map((item: Book) => (
                                <DefaultThumb
                                    key={item.name}
                                    title={item.name}
                                    author={item.author}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="slider" ref={sliderRef}>
                            {data.results.map((item: Author) => (
                                <DefaultThumb
                                    key={item.name}
                                    title={item.name}
                                    author={item.name}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => moveSlider("right")}
                />
            </div>
        </StyledSharedUiCarousel>
    )
}

// const Books = forwardRef((sliderRef) => {
//     const { isLoading, error, data } = useQuery("booksData", () =>
//         fetch("http://localhost:5001/v1/books").then((res) => res.json())
//     )

//     if (isLoading) return <div>"Loading..."</div>
//     if (error) return <div>"Error..."</div>

//     return (
//         <div className="slider" ref={sliderRef}>
//             {data.results.map((book: Book) => (
//                 <DefaultThumb
//                     key={book.name}
//                     title={book.name}
//                     author={book.author}
//                 />
//             ))}
//         </div>
//     )
// })

const DefaultThumb = (props: DefaultThumbProps) => {
    return (
        /* <Wrapper className="wrapper"> */
        /*     <p>{props.title}</p> */
        /*     <p>{props.author}</p> */
        /* </Wrapper> */
        <div className="listItem">
            {props.title}
            {"\nAuthor: "}
            {props.author}
        </div>
    )
}

interface DefaultThumbProps {
    title: string
    author: string
}

export default SharedUiCarousel
