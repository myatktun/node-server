import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

interface MenuBarProps {
    items: Array<string>
}

const MenuBar = ({ items }: MenuBarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <Button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
            >
                Browse
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#1d2021",
                    },
                }}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        color="inherit"
                        onClick={handleClose}
                        sx={{
                            color: "#ebdbb2",
                            "&:hover": {
                                backgroundColor: "rgba(40,40,40, 0.9)",
                            },
                        }}
                        component={RouterLink}
                        to={`/${item.toLowerCase()}`}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default MenuBar
