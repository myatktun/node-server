import styled from "styled-components"

export const StyledSharedUiHeader = styled.nav`
    background-color: #1d2021;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30px 10%;
    flex-wrap: wrap;

    img {
        cursor: pointer;
        margin: 10px;
    }

    @media screen and (max-width: 800px) {
        padding: 30px 5%;
    }

    @media screen and (max-width: 750px) {
        flex-direction: column;
        padding: 30px 0;
    }
`
