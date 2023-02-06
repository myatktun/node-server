import styled from "styled-components"

export const StyledPage = styled.div`
    color: #ebdbb2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding-top: 64px;

    .loader {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .title {
        color: #ebdbb2;
        font-weight: 900;
        font-size: 30px;
        margin-top: 20px;
        margin-left: 50px;
        margin-bottom: 20px;
    }

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
