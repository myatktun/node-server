import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

/* eslint-disable-next-line */
export interface SearchBarProps {}

const SearchBar = () => {
    const navigate = useNavigate()
    const [searchTitle, setSearchTitle] = useState("books")

    const handleChange = (event: SelectChangeEvent) => {
        setSearchTitle(event.target.value as string)
    }

    const search = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const event = e.target as HTMLInputElement
            navigate("/search", { state: { searchTitle: searchTitle, searchValue: event.value } })
            event.value = ""
        }
    }

    return (
        <SearchWrapper>
            <Box sx={{ minWidth: 95, marginLeft: "auto" }}>
                <FormControl fullWidth size="small">
                    <Select
                        value={searchTitle}
                        label="Search"
                        onChange={handleChange}
                        sx={{ color: "#ebdbb2", backgroundColor: "#282828" }}
                        inputProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        color: "#ebdbb2",
                                        backgroundColor: "#282828",
                                        "& .MuiMenuItem-root:hover": {
                                            backgroundColor: "#757575",
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value={"books"}>Books</MenuItem>
                        <MenuItem value={"authors"}>Authors</MenuItem>
                        <MenuItem value={"categories"}>Categories</MenuItem>
                        <MenuItem value={"notes"}>Notes</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onKeyDown={(e) => search(e)}
                />
            </Search>
        </SearchWrapper>
    )
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#282828",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
        marginLeft: "auto",
        width: "auto",
    },
}))

const SearchWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    maxHeight: 40,
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
        marginLeft: "auto",
        width: "auto",
    },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}))

export default SearchBar
