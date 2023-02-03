import { useQuery } from "react-query"
import { StyledPage } from "./page.styles"
import Grid from "../grid/grid"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Error from "../error/error"

interface PageProps {
    title: string
}

export const Page = ({ title }: PageProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentData] = useState({ results: [{ name: "", olid: "unknown" }] })

    const fetchData = async () => {
        const res = await fetch(
            `${process.env.NX_API_URL}/${title.toLowerCase()}?sort=dateAdded&page=${currentPage}`
        )
        return res.json()
    }

    const { isLoading, error, data } = useQuery(
        [`${title.toLowerCase()}Data`, currentPage],
        fetchData
    )

    const setPage = (direction: string) => {
        if (direction === "right") {
            setCurrentPage((prevPage) => prevPage + 1)
        } else {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }

    useEffect(() => {
        if (data) {
            setCurrentData(data)
        }
    }, [currentPage, currentData, data])

    if (isLoading) {
        return (
            <StyledPage>
                <div className="loader">
                    <CircularProgress />
                </div>
            </StyledPage>
        )
    }

    if (error) {
        return (
            <StyledPage>
                <Error />
            </StyledPage>
        )
    }

    return (
        <StyledPage>
            <div className="title">{title.toUpperCase()}</div>
            <Grid title={title} data={currentData.results} />
            <div className="slider">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => setPage("left")}
                    style={{ visibility: currentPage !== 1 ? "visible" : "hidden" }}
                />
                {currentPage}
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => setPage("right")}
                    style={{
                        visibility: currentPage !== data.total_pages ? "visible" : "hidden",
                    }}
                />
            </div>
        </StyledPage>
    )
}

export default Page
