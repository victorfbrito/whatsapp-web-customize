import React from 'react';

import * as ts from '../../types'
import * as sc from './styles'

export default function SchemeButton( { data }  : any) {
    return(
        <sc.Container>
            <sc.Circle>
                {data.length > 1 ? data.slice(0, 2).map((e: ts.Color, i: number) => 
                    <sc.Slice color={e} key={i}/>
                ) :
                    <sc.Slice whole color={data[0]} key={0}/>
                }
            </sc.Circle>
        </sc.Container>
    )
}