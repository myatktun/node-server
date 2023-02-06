import { useEffect, useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import SearchBar from "./search-bar/search-bar"
import DrawerMenu from "./drawermenu/drawermenu"
import MenuBar from "./menu-bar/menu-bar"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import BookIcon from "@mui/icons-material/Book"

import useMediaQuery from "@mui/material/useMediaQuery"
import useTheme from "@mui/material/styles/useTheme"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps { }

export const Header = () => {
    const [tab, setTab] = useState<number | boolean>(1)
    const { pathname } = useLocation()
    const isMatch = useMediaQuery(useTheme().breakpoints.down("md"))

    const changeTab = (_: React.SyntheticEvent, value: number) => {
        setTab(value)
    }

    useEffect(() => {
        if (pathname === "/") setTab(1)
        else if (pathname.includes("/books")) setTab(2)
        else if (pathname.includes("/notes")) setTab(3)
        else setTab(false)
    }, [tab, pathname])

    return (
        <AppBar position="fixed" sx={{ background: "#1d2021", color: "#ebdbb2" }}>
            <Toolbar>
                {isMatch ? (
                    <>
                        <DrawerMenu />
                        <Tab
                            icon={<BookIcon sx={{ marginX: "1.2rem" }} fontSize="large" />}
                            component={RouterLink}
                            to="/"
                        />
                    </>
                ) : (
                    <>
                        <Tabs
                            textColor="inherit"
                            value={tab}
                            indicatorColor="primary"
                            onChange={changeTab}
                        >
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
                    </>
                )}
                <SearchBar />
            </Toolbar>
        </AppBar>
    )
}

export default Header
