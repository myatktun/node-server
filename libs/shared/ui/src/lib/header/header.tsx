import { Link } from "react-router-dom"
import { MenuBar } from "./menu-bar/menu-bar"
import { SearchBar } from "./search-bar/search-bar"
import { StyledSharedUiHeader } from "./header.styles"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps {}

export function Header() {
    return (
        <StyledSharedUiHeader>
            <Link to="/">
                <img src="" alt="Logo" />
            </Link>
            <MenuBar />
            <SearchBar />
        </StyledSharedUiHeader>
    )
}

export default Header
