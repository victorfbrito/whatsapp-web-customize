import React from 'react';

import * as ts from '../../types'
import * as sc from './styles'

export default function ThemeInfo({ data }: ts.ThemeItemType) {
    console.log('data received: ',data)
    return(
        <sc.Container>
            <sc.Icon src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title} />
            <p>{data.title}</p>
        </sc.Container>
    )
}