import React from 'react'

import { Container } from './styles'

export default function AppContainer(props: React.PropsWithChildren<{}>) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}