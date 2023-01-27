import styled from "styled-components"

export const StyledDetail = styled.div`
    background-color: #3c3836;
    color: #ebdbb2;
    display: flex;
    flex-direction: column;

    .detail {
        display: flex;
        padding: 3rem;
        align-items: center;
        height: 100%;
    }

    img {
        border-radius: 1.5rem;
    }

    li {
        margin: 20px;
        list-style: none;
    }

    .title {
        font-size: 3rem;
        font-weight: 900;
    }

    .info {
        margin-left: 20%;
        height: 100%;
    }
`
