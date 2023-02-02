import { SearchBar } from "./search-bar/search-bar"

import { useEffect, useState } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import MenuBar from "./menu-bar/menu-bar"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import BookIcon from "@mui/icons-material/Book"

import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import useMediaQuery from "@mui/material/useMediaQuery"
import useTheme from "@mui/material/styles/useTheme"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps { }

export const Header = () => {
    const [tab, setTab] = useState(1)
    const { pathname } = useLocation()
    const isMatch = useMediaQuery(useTheme().breakpoints.down("md"))

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
        <AppBar position="fixed" sx={{ background: "#1d2021", color: "#ebdbb2" }}>
            <Toolbar>
                {isMatch ? (
                    <>
                        <SideMenu />
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

const SideMenu = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemText primary="Hello" />
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon color="secondary" />
            </IconButton>
        </>
    )
}

export default Header
