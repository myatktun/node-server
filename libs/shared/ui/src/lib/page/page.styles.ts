import styled from "styled-components"

export const StyledPage = styled.div`
    background-color: #3c3836;
    color: #ebdbb2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .slider {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }

    .slider .sliderArrow {
        color: #d79921;
        cursor: pointer;
        margin: 10px;
    }

    .slider .sliderArrow:hover {
        transform: scale(1.2);
    }
`
