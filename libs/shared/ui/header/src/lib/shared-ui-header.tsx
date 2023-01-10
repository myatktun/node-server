import styled from "styled-components"
import { MenuBar } from "./menu-bar/menu-bar"
import { SearchBar } from "./search-bar/search-bar"

/* eslint-disable-next-line */
export interface SharedUiHeaderProps {}

const StyledSharedUiHeader = styled.div`
    background-color: #1d2021;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20%;
    flex-wrap: wrap;
    img {
        cursor: pointer;
    }
`

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
