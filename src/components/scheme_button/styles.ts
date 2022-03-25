import styled from "styled-components";

import * as ts from '../../types'

const circle_size = 150
const slice_size = circle_size / 2

export const Container = styled.div`
`;

export const Circle = styled.div`
    height: ${circle_size}px; 
    width: ${circle_size}px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
`

export const Slice = styled.div<ts.SchemeSliceProps>`
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    border: ${slice_size}px solid transparent;
    border-bottom: 0;
    border-top: ${slice_size}px solid ${props => props.color};
    // transform: rotate(${props => props.degree}deg);
    // transform-origin: bottom left;
`