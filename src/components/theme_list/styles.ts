import styled from "styled-components";

const item_spacing = 2

export const List = styled.div`
    background-color: #00000025;
    padding: ${item_spacing}px;
    display: flex;
    gap: ${item_spacing}px;
    flex-wrap: wrap;
    width: 50%;
    overflow-y: scroll;
`;