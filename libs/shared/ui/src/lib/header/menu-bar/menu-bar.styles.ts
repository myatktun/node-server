import styled from "styled-components"

export const StyledMenuBar = styled.nav`
    color: #ebdbb2;
    background-color: #32302f;
    padding: 10px 0 10px 0;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    li,
    a {
        text-decoration: none;
        color: #ebdbb2;
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

    .menu-dropdown-content {
        position: absolute;
        border-radius: 15px;
        z-index: 1;
        background-color: #32302f;
        overflow: hidden;
        padding: 0.5rem 1rem;
    }

    .menu-dropdown-item {
        height: 50px;
        display: flex;
        align-items: center;
    }

    .menu-dropdown-item: hover {
        color: #458588;
    }
`
