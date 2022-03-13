import styled from "styled-components";

const icon_size = 100

export const Item = styled.div`
    cursor: pointer;
    position: relative;
    width: ${icon_size}px;
    height: ${icon_size}px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        width: ${icon_size}px;
        height: ${icon_size}px;
        transition: 0.1s;
    }
    & > p {
        position: absolute;
        bottom: 0;
        margin: 0;
        font-size: 12px;
        display: flex;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: ${icon_size / 2.5}px;
        background-color: #42424280;
    }
    &:hover > img {
        width: ${icon_size + 12}px;
        height: ${icon_size + 12}px;
    }
`;