import styled from "styled-components"

/* eslint-disable-next-line */
export interface MenuBarProps {}

const StyledMenuBar = styled.div`
    color: #ebdbb2;
    background-color: #32302f;
    padding: 10px 0 10px 0;
    margin: 10px 0;

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
        padding: 0 20px;
    }

    ul li a {
        transition: all 0.3s ease 0s;
    }

    ul li a :hover {
        color: #458588;
    }

    button :hover {
        color: #458588;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
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
`

export function MenuBar() {
    const showDropDown = () => {
        document.getElementById("dropdown-content")?.classList.toggle("show")
    }

    return (
        <StyledMenuBar>
            <nav>
                <ul>
                    <li>
                        <a href="">Books</a>
                    </li>
                    <li>
                        <a href="">Notes</a>
                    </li>
                    <li className="dropdown">
                        <button onClick={showDropDown} className="dropDownBtn">
                            Browse
                        </button>
                        <div className="dropdown-content" id="dropdown-content">
                            <p>Authors</p>
                            <p>Categories</p>
                        </div>
                    </li>
                </ul>
            </nav>
        </StyledMenuBar>
    )
}

export default MenuBar
