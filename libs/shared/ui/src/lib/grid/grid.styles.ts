import styled from "styled-components"

export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1.2rem;
    padding: 30px 80px;
    justify-items: center;
    align-items: center;

    .listItem {
        height: 280px;
        width: 180px;
    }

    @media screen and (max-width: 720px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
