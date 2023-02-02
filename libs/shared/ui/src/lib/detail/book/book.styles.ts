import styled from "styled-components"

const StyledBook = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-size: 3rem;
        font-weight: 900;
    }

    .info {
        width: 50%;
        font-size: 1.5rem;
        height: 100%;
        display: flex;
        flex-direction: column;
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
`

export default StyledBook
