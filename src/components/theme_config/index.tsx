import React from 'react'

import * as sc from './styles'

export default function ThemeConfig({custom_props}: any) {
    return (
        <sc.Container>
            {custom_props.map((i: any) => 
                <input type={i.input_type} value={i.value}/>
            )}
        </sc.Container>
    )
}