import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { StyledMenuBar } from "./menu-bar.styles"

/* eslint-disable-next-line */
export interface MenuBarProps {}

export const MenuBar = () => {
    const [isOpen, setOpen] = useState(false)
    const menuRef = useRef<HTMLLIElement>(null)

    const closeDropDown = () => {
        setOpen(false)
    }

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
    }, [isOpen])

    return (
        <StyledMenuBar>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/notes">Notes</Link>
                </li>
                <li ref={menuRef}>
                    <p onClick={() => setOpen(!isOpen)}>Browse</p>
                    {isOpen && <MenuDropDown closeDropDown={closeDropDown} />}
                </li>
            </ul>
        </StyledMenuBar>
    )
}

interface MenuDropDownProps {
    closeDropDown: () => void
}

const MenuDropDown = ({ closeDropDown }: MenuDropDownProps) => {
    return (
        <div className="menu-dropdown-content" id="menu-dropdown-content">
            <MenuDropDownItem name="Authors" closeDropDown={closeDropDown} />
            <MenuDropDownItem name="Categories" closeDropDown={closeDropDown} />
        </div>
    )
}

interface MenuDropDownItemProps {
    name: string
    closeDropDown: () => void
}

const MenuDropDownItem = ({ name, closeDropDown }: MenuDropDownItemProps) => {
    return (
        <Link to={`/${name}`} className="menu-dropdown-item" onClick={() => closeDropDown()}>
            {name}
        </Link>
    )
}

export default MenuBar
