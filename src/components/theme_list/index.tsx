import React from 'react';

import { List } from './styles'

export default function ThemeList({ children }: any) {
    return (
        <List>
            {children}
        </List>
    )
}