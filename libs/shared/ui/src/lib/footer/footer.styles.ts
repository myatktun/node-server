import styled from "styled-components"

export const StyledSharedUiFooter = styled.div`
    color: #ebdbb2;
    background-color: #1d2021;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding: 30px;
    margin-top: auto;

    .title {
        font-weight: 900;
        font-size: 30px;
    }

    .body {
        margin-top: 15px;
    }

    .body li,
    a {
        list-style: none;
        margin: 0.5rem 0.2rem;
        font-size: 1rem;
        cursor: pointer;
        color: #ebdbb2;
        text-decoration: none;
    }

    .body .topic:hover,
    li:hover,
    a:hover {
        color: #458588;

        li,
        a {
            color: #458588;
        }
    }

    .body .topic {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`
