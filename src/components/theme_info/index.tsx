import React from 'react';

import ThemeConfig from '../theme_config'

import * as ts from '../../types'
import * as sc from './styles'

export default function ThemeInfo({ data }: ts.ThemeItemType) {
    console.log('data received: ',data)
    return(
        <sc.Container>
            {data?.title &&
                <>
                    <sc.Icon src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title} />
                    <p>{data.title}</p>
                    <ThemeConfig custom_props ={data?.custom_props || {}}/>
                    {data.artist &&
                        <p>Theme based on code by <a href={data.artist.link} target="_blank" rel="noreferrer">{data.artist.name}</a></p>
                    }
                </>
            }
        </sc.Container>
    )
}