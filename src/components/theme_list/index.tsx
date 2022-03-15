import React from 'react'

import { List } from './styles'

export default function ThemeList(props: React.PropsWithChildren<{}>) {
    return (
        <List>
            {props.children}
        </List>
    )
}