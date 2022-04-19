import styled from "styled-components";

import {Tabs as muiTabs} from '@mui/material';
import {Tab as muiTab} from '@mui/material';

const item_spacing = 2


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const List = styled.div`
    align-content: flex-start;
    background-color: #00000025;
    padding: ${item_spacing}px;
    display: flex;
    gap: ${item_spacing}px;
    max-height: 100%;
    flex-wrap: wrap;
    overflow-y: scroll;
`;

export const Panel = styled.div`
    min-height: 0;
`;

export const Tabs = styled(muiTabs)`

`;

export const Tab = styled(muiTab)`
    color: #fff;
`;