import styled from "styled-components"

export const StyledSharedUiFooter = styled.div`
    color: #ebdbb2;
    background-color: #282828;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 30px;

    .title {
        font-weight: 900;
        font-size: 30px;
    }

    .body {
        margin-top: 15px;
    }

    .body li {
        list-style: none;
        margin: 0.5rem 0.2rem;
        font-size: 1rem;
        cursor: pointer;
    }

    .body .topic:hover,
    li:hover {
        color: #458588;
    }

    .body .topic {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`
