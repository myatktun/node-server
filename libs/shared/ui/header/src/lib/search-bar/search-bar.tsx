import styled from "styled-components"

/* eslint-disable-next-line */
export interface SearchBarProps {}

const StyledSearchBar = styled.div`
    color: #ebdbb2;
    background-color: #32302f;
    padding: 10px 0 10px 0;

    li,
    a,
    button {
        text-decoration: none;
        color: #ebdbb2;
    }

    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
    }

    ul {
        list-style: none;
    }

    ul li {
        display: inline-block;
        padding: 0 10px;
    }

    .xx {
        position: relative;
        display: inline-block;
    }

    button:hover,
    p:hover {
        color: #458588;
    }

    .dropdown-types {
        display: none;
        position: absolute;
        background-color: #32302f;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 12px 16px;
        z-index: 1;
    }

    .show {
        display: block;
    }

    input[type="text"],
    textarea {
        background-color: #1d2021;
        border: 0;
        padding: 2px;
    }
`

export function SearchBar() {
    const showDropDown = () => {
        document.getElementById("dropdown-types")?.classList.toggle("show")
    }

    return (
        <StyledSearchBar>
            <nav>
                <ul>
                    <li className="xx">
                        <button onClick={showDropDown} className="dropDownBtn">
                            Types
                        </button>
                        <div className="dropdown-types" id="dropdown-types">
                            <p>Book</p>
                            <p>Author</p>
                            <p>Category</p>
                            <p>Note</p>
                        </div>
                    </li>
                    <li>
                        <input type="text" placeholder="Search" />
                    </li>
                </ul>
            </nav>
        </StyledSearchBar>
    )
}

export default SearchBar
