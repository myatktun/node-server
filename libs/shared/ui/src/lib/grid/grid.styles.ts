import styled from "styled-components"

export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1.2rem;
    padding: 30px 80px;
    justify-items: center;
    align-items: center;

    .listItemImg {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .listItem {
        text-align: center;
        white-space: pre-wrap;
        background-color: #757575;
        vertical-align: top;
        height: 200px;
        width: 150px;
        max-height: 200px;
        max-width: 150px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;

        img {
            border-radius: 20px;
        }

        :hover {
            opacity: 0.8;
            transform: scale(1.1);
        }
    }

    @media screen and (max-width: 720px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
