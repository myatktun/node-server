import { useEffect, useRef, useState } from "react"
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
                    <a href="#">Books</a>
                </li>
                <li>
                    <a href="#">Notes</a>
                </li>
                <li ref={menuRef}>
                    <a href="#" onClick={() => setOpen(!isOpen)}>
                        Browse
                    </a>
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
        <a href="#" className="menu-dropdown-item">
            {props.name}
        </a>
    )
}

export default MenuBar
