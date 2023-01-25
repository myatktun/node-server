import styled from "styled-components"

export const StyledSharedUiCarousel = styled.div`
    color: white;
    padding: 20px;

    .title {
        color: #ebdbb2;
        font-weight: 900;
        font-size: 30px;
        margin-left: 100px;
        cursor: pointer;
    }

    .title:hover {
        color: #458588;
    }

    .carousel {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .wrapper {
        max-width: 1200px;
        width: 90%;
        margin: 10px 20px;
    }

    .wrapper .slider {
        cursor: pointer;
        height: 200px;
        overflow: hidden;
        white-space: nowrap;
        scroll-behavior: smooth;
    }

    .slider .listItem {
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        white-space: pre-wrap;
        background-color: #757575;
        vertical-align: top;
        padding: 10px;
        height: 100%;
        margin-left: 2rem;
        width: calc(100% / 7);
    }

    .slider .listItem:first-child {
        margin-left: 0;
    }

    .sliderArrow {
        height: 100%;
        cursor: pointer;
        z-index: 999;
        color: #ebdbb2;
    }

    .sliderArrow.left {
        left: 0;
    }

    .sliderArrow.right {
        right: 0;
    }

    .sliderArrow:hover,
    .sliderArrow:focus {
        background-color: rgba(40, 40, 40, 0.5);
        transform: scale(1.3);
        color: #458588;
    }

    @media screen and (max-width: 800px) {
        .slider .listItem {
            width: calc(100% / 3);
        }

        .title {
            margin-left: 0;
        }
    }
`
