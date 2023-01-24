import styled from "styled-components"

export const StyledSharedUiFooter = styled.div`
    color: #ebdbb2;
    background-color: #282828;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;

    .title {
        font-weight: 900;
        font-size: 30px;
    }

    .body {
        margin-top: 15px;
    }

    .body li {
        list-style: none;
        margin: 0.8rem 0.2rem;
        font-size: 1.2rem;
    }

    .body .topic {
        display: flex;
        align-items: center;
    }
`
