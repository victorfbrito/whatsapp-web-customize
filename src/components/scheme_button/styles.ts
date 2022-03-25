import styled from "styled-components";

import * as ts from '../../types'

const circle_size = 20

export const Container = styled.li`
    height: ${circle_size + 10}px; 
    width: ${circle_size + 10}px;
    list-style-type: none;
    border: 1px solid #ffffff55;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Circle = styled.div`
    height: ${circle_size}px; 
    width: ${circle_size}px;
    border-radius: 50%;
    transform: rotate(315deg);
    overflow: hidden;
`

export const Slice = styled.div<ts.SchemeSliceProps>`
    width:${circle_size}px;
    height:${props => props.whole ? circle_size : circle_size / 2}px;
    background: ${props => props.color};
`