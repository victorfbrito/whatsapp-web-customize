import React from 'react';

import { Item } from './styles'

interface ArtistType {
    name: string
    link: string
}

interface ThemeItemType {
    data: {
        title: string
        path: string
        type: string
        artist: ArtistType
    }
}

export default function ThemeItem({ data }: ThemeItemType) {
    return(
        <Item>
            <img src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title}/>
            <p>{data.title}</p>
        </Item>
    )
}