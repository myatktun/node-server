import { MenuBar } from "./menu-bar/menu-bar"
import { SearchBar } from "./search-bar/search-bar"
import { StyledSharedUiHeader } from "./header.styles"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps {}

export function SharedUiHeader() {
    return (
        <StyledSharedUiHeader>
            <img src="" alt="Logo" />
            <MenuBar />
            <SearchBar />
        </StyledSharedUiHeader>
    )
}

export default SharedUiHeader
