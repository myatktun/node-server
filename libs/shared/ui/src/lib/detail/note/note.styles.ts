import styled from "styled-components"

const StyledNote = styled.div`
    padding: 20px;
    background-color: #282828;
    font-size: 1.2rem;

    a {
        color: inherit;

        :hover {
            color: #458588;
        }
    }

    ul {
        margin-left: 1rem;
    }

    li {
        list-style: inherit;
        margin-top: 5px;
        margin-bottom: 12px;
    }

    h1 {
        text-align: center;
        font-size: 3rem;
        padding-bottom: 5rem;
    }

    h2 {
        font-size: 2rem;
        border-bottom: 2px solid #a89984;
        padding-bottom: 0.5rem;
        padding-top: 2rem;
        margin-bottm: 200px;
    }

    h5 {
        color: #a89984;
    }

    strong {
        font-size: 1.3rem;
    }

    code {
        font-size: 1rem;
    }

    .hljs {
        margin: 1rem 0;
        font-size: 1rem;
    }
`

export default StyledNote
