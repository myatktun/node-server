import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

/* eslint-disable-next-line */
export interface DrawermenuProps {}

const pages = ["Books", "Notes", "Authors", "Categories"]

const Drawermenu = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                    sx: { backgroundColor: "#1d2021" },
                }}
            >
                <List>
                    <ListItemButton
                        onClick={() => setOpenDrawer(!openDrawer)}
                        component={RouterLink}
                        to="/"
                        sx={{
                            "&:hover": {
                                backgroundColor: "rgba(40,40,40, 0.9)",
                            },
                        }}
                    >
                        <ListItemText primary="Home" sx={{ color: "#ebdbb2" }} />
                    </ListItemButton>
                    {pages.map((page, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => setOpenDrawer(!openDrawer)}
                            component={RouterLink}
                            to={`/${page.toLowerCase()}`}
                            sx={{
                                width: "150px",
                                "&:hover": {
                                    backgroundColor: "rgba(40,40,40, 0.9)",
                                },
                            }}
                        >
                            <ListItemText primary={`${page}`} sx={{ color: "#ebdbb2" }} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton sx={{ color: "#ebdbb2" }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default Drawermenu
