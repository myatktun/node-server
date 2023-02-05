import styled from "styled-components"
import { useQueries } from "react-query"
import Thumb from "../../thumb/thumb"
import { AuthorResponse } from "@projectx/shared/interface"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Error from "../../error/error"

interface AuthorProps {
    data: AuthorResponse
}

const StyledCategory = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .listItem {
        width: 180px;
        height: 280px;
    }
`

const Category = ({ data }: AuthorProps) => {
    const fetchData = async (book: string) => {
        const res = await fetch(`${process.env.NX_API_URL}/books/${book}`)
        return res.json()
    }

    const all = useQueries(
        data.results[0].books.map((book) => {
            return {
                queryKey: [book],
                queryFn: () => fetchData(book),
            }
        })
    )

    if (all.some((e) => e.isLoading))
        return (
            <StyledCategory>
                <CircularProgress />
            </StyledCategory>
        )

    if (all.some((e) => e.error)) {
        return (
            <StyledCategory>
                <Error />
            </StyledCategory>
        )
    }

    return (
        <StyledCategory>
            <Typography
                align="center"
                variant="h2"
                gutterBottom
                sx={{ color: "#ebdbb2", marginTop: "5%" }}
            >
                {data.results[0].name}
            </Typography>
            <Grid
                container
                columns={4}
                spacing={2}
                sx={{ color: "#ebdbb2", marginTop: "8rem", marginBottom: "10rem" }}
            >
                {all.map((i, index) => (
                    <Grid
                        item
                        xs={1}
                        key={index}
                        sx={{
                            textAlign: "center",
                            margin: "2rem 0",
                        }}
                    >
                        <Thumb title={"books"} item={i.data.results[0]} />
                    </Grid>
                ))}
            </Grid>
        </StyledCategory>
    )
}

export default Category
