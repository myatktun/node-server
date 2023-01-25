import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { StyledMenuBar } from "./menu-bar.styles"

/* eslint-disable-next-line */
export interface MenuBarProps {}

export function MenuBar() {
    const [isOpen, setOpen] = useState(false)
    const menuRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current !== null && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    return (
        <StyledMenuBar>
            <ul>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/notes">Notes</Link>
                </li>
                <li ref={menuRef}>
                    <p onClick={() => setOpen(!isOpen)}>Browse</p>
                    {isOpen && <MenuDropDown />}
                </li>
            </ul>
        </StyledMenuBar>
    )
}

const MenuDropDown = () => {
    return (
        <div className="menu-dropdown-content" id="menu-dropdown-content">
            <MenuDropDownItem name="Authors" />
            <MenuDropDownItem name="Categories" />
        </div>
    )
}

interface MenuDropDownItemProps {
    name: string
}

const MenuDropDownItem = (props: MenuDropDownItemProps) => {
    return (
        <Link to="/books" className="menu-dropdown-item">
            {props.name}
        </Link>
    )
}

export default MenuBar
