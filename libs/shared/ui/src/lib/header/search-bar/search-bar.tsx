import { StyledSearchBar } from "./search-bar.styles"

/* eslint-disable-next-line */
export interface SearchBarProps {}

export function SearchBar() {
    return (
        <StyledSearchBar>
            <ul>
                <li>
                    <select id="" name="">
                        <SearchDropDownItem name="All" />
                        <SearchDropDownItem name="Book" />
                        <SearchDropDownItem name="Author" />
                        <SearchDropDownItem name="Category" />
                        <SearchDropDownItem name="Note" />
                    </select>
                </li>
                <li>
                    <input type="text" placeholder="Search" />
                </li>
            </ul>
        </StyledSearchBar>
    )
}

interface SearchDropDownItemProps {
    name: string
}
const SearchDropDownItem = (props: SearchDropDownItemProps) => {
    return (
        <option className="search-dropdown-item" value="">
            {props.name}
        </option>
    )
}

export default SearchBar
