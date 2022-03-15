import React from 'react'

import * as sc from './styles'

export default function AppContainer(props: React.PropsWithChildren<{}>) {
    return (
        <sc.Container>
            {props.children}
        </sc.Container>
    )
}