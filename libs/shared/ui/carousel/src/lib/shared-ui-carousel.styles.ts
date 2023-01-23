import styled from "styled-components"

export const StyledSharedUiCarousel = styled.div`
    background-color: #282828;
    color: white;
    padding: 10px 20px;

    .title {
        color: white;
        font-weight: 900;
        font-size: 30px;
        margin-left: 10px;
    }

    .carousel {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper {
        max-width: 90%;
        margin: 0 20px;
    }

    .wrapper .slider {
        cursor: pointer;
        max-width: 1200px;
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
        height: 200px;
        margin-left: 10px;
        width: calc(100% / 5);
    }

    .sliderArrow {
        height: 100%;
        width: 46px;
        cursor: pointer;
        z-index: 999;
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
        transform: scale(1.1);
    }
`

export const Wrapper = styled.div`
    /* width: 100%; */
    /* height: 100%; */
    /* min-height: 300px; */
    /* max-width: 720px; */
    /* background-color: var(--darkGrey); */
    /* color: white; */
    /* transition: all 0.3s; */
    /* border-radius: 20px; */
    /* animation: animateThumb 0.5s; */
    text-align: center;

    /* :hover { */
    /*     opacity: 0.8; */
    /*     cursor: pointer; */
    /* } */
    /* @keyframes animateThumb { */
    /*     from { */
    /*         opacity: 0; */
    /*     } */
    /*     to { */
    /*         opacity: 1; */
    /*     } */
    /* } */
`

export const Text = styled.div`
    color: var(--white);
    text-align: center;
    /* max-width: 10px; */
    /* border-radius: 20px 20px 0 0; */
    /* padding: 5px 10px 20px 10px; */
    /* @media screen and (max-width: 768px) { */
    /*     font-size: 300px; */
    /* } */
`
