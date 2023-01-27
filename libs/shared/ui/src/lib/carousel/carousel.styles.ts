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
        text-decoration: none;
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
        height: 260px;
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
        width: calc(100% / 6);
    }

    .slider .listItem:first-child,
    .slider .listItemImg:first-child {
        margin-left: 0;
    }

    .slider .listItemImg {
        padding: 10px;
        height: 100%;
        margin-left: 1rem;
        width: calc(100% / 6);
    }

    .slider .listItem,
    .slider .listItemImg {
        :hover {
            transform: scale(1.1);
        }
    }

    .sliderArrow {
        height: 100%;
        cursor: pointer;
        color: #ebdbb2;
    }

    .sliderArrow:hover,
    .sliderArrow:focus {
        transform: scale(1.5);
        color: #458588;
    }

    @media screen and (max-width: 1400px) {
        .title {
            margin-left: 10px;
        }
    }

    @media screen and (max-width: 1100px) {
        .wrapper .slider {
            height: 200px;
        }
    }

    @media screen and (max-width: 850px) {
        .slider .listItem {
            width: calc(100% / 4);
        }

        .slider .listItemImg {
            width: calc(100% / 4);
        }
    }

    @media screen and (max-width: 500px) {
        .wrapper {
            margin: 10px 5px;
        }

        .slider .listItem,
        .slider .listItemImg {
            width: calc(100% / 2);
        }
    }

    @media screen and (max-width: 350px) {
        .slider .listItem,
        .slider .listItemImg {
            width: 100%;
        }
    }
`
