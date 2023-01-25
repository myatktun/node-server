import styled from "styled-components"

export const StyledSearchBar = styled.div`
    color: #ebdbb2;
    background-color: #32302f;
    padding: 10px 0 10px 0;
    margin: 10px;

    li,
    a,
    button {
        text-decoration: none;
        color: #ebdbb2;
    }

    ul {
        list-style: none;
    }

    ul li {
        display: inline-block;
        padding: 0 10px;
    }

    a:hover,
    p:hover {
        color: #458588;
    }

    .search-dropdown-content {
        position: absolute;
        border-radius: 15px;
        z-index: 1;
        background-color: #32302f;
        overflow: hidden;
        padding: 0.5rem 1rem;
    }

    .search-dropdown-item {
        height: 30px;
        display: flex;
        align-items: center;
    }

    .search-dropdown-item: hover {
        background-color: #458588;
        cursor: pointer;
    }

    select {
        background-color: #32302f;
        border: none;
        color: #ebdbb2;
    }

    option:checked {
        color: #458588;
    }

    input[type="text"],
    textarea {
        background-color: #1d2021;
        border: 0;
        margin: 5px 0;
        padding: 2px;
    }
`
