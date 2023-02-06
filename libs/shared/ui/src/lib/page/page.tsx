import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { StyledPage } from "./page.styles"
import Grid from "../grid/grid"
import Error from "../error/error"
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import CircularProgress from "@mui/material/CircularProgress"

interface PageProps {
    title: string
}

export const Page = ({ title }: PageProps) => {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentData] = useState({ results: [{ name: "", olid: "unknown" }] })

    const fetchData = async () => {
        if (location.state) {
            const { searchValue } = location.state
            const res = await fetch(
                `${process.env.NX_API_URL}/books?search=${searchValue}&sort=dateAdded&page=${currentPage}`
            )
            return res.json()
        }

        const res = await fetch(
            `${process.env.NX_API_URL}/${title.toLowerCase()}?sort=dateAdded&page=${currentPage}`
        )
        return res.json()
    }

    const { isLoading, error, data, refetch } = useQuery(
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
        refetch()
        if (data) {
            setCurrentData(data)
        }
    }, [currentPage, currentData, data, location.state, refetch])

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

    if (location.state) {
        const { searchValue } = location.state
        return (
            <StyledPage>
                <div className="title">
                    {title} results for "{searchValue.toUpperCase()}"
                </div>
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
