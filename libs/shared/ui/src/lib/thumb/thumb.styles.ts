import styled from "styled-components"

export const StyledSharedUiThumb = styled.div`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    white-space: pre-wrap;
    vertical-align: top;
    height: 100%;

    a {
        text-decoration: none;
    }

    :hover {
        opacity: 0.8;
        transform: scale(1.1);
    }
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    border-radius: 20px;
    animation: animateThumb 0.5s;
    object-fit: fill;

    :hover {
        opacity: 0.8;
    }

    @keyframes animateThumb {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    transition: all 0.3s;
    border-radius: 20px;
    animation: animateThumb 0.5s;
    background-color: #757575;
    padding-top: 1rem;

    @keyframes animateThumb {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const Text = styled.div`
    color: var(--white);
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding: 5px 10px 20px 10px;
`
