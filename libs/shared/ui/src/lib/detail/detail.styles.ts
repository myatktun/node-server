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
        justify-content: space-around;
        height: 100%;
    }

    .detail img {
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
        width: 50%;
        font-size: 2rem;
        height: 100%;
    }

    .info a {
        text-decoration: none;
        color: inherit;

        :hover {
            color: #458588;
        }
    }

    .detail .listItem {
        height: 350px;
        width: 250px;
    }
`
