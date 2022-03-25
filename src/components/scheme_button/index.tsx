import React from 'react';

import * as ts from '../../types'
import * as sc from './styles'

export default function SchemeButton( { data }  : any) {
    const angle = 360/(data.length)

    return(
        <sc.Container>
            <sc.Circle>
                {data.map((e: ts.Color, i: number) => 
                    <sc.Slice color={e} degree={ i * angle } key={i}/>
                )}
            </sc.Circle>
        </sc.Container>
    )
}