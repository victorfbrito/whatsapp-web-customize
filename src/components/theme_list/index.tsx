import React from 'react'

import * as sc from './styles'

export default function ThemeList(props: React.PropsWithChildren<{}>) {
    return (
        <sc.List>
            {props.children}
        </sc.List>
    )
}