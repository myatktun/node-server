// import { SearchBar } from "./search-bar/search-bar"

import { useEffect, useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import MenuBar from "./menu-bar/menu-bar"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import BookIcon from "@mui/icons-material/Book"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps {}

export const Header = () => {
    const [tab, setTab] = useState(1)
    const { pathname } = useLocation()

    const changeTab = (e: React.SyntheticEvent, value: number) => {
        setTab(value)
    }

    useEffect(() => {
        if (pathname.includes("/books")) setTab(2)
        else if (pathname.includes("/notes")) setTab(3)
        else if (pathname.includes("/authors")) setTab(4)
        else if (pathname.includes("/categories")) setTab(5)
        else setTab(1)
    }, [tab, pathname])

    return (
        <AppBar position="relative" sx={{ background: "#1d2021", color: "#ebdbb2" }}>
            <Toolbar>
                <Tabs textColor="inherit" value={tab} indicatorColor="primary" onChange={changeTab}>
                    <Tab
                        icon={<BookIcon sx={{ marginX: "1.2rem" }} fontSize="large" />}
                        component={RouterLink}
                        to="/"
                    />
                    <Tab label="Home" component={RouterLink} to="/" />
                    <Tab label="Books" component={RouterLink} to="/books" />
                    <Tab label="Notes" component={RouterLink} to="/notes" />
                </Tabs>
                <MenuBar items={["Authors", "Categories"]} />
            </Toolbar>
        </AppBar>
    )
}

export default Header
