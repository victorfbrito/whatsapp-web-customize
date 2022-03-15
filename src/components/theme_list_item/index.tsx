import * as ts from '../../types'

import { Item } from './styles'

export default function ThemeListItem({ data }: ts.ThemeItemType) {
    return(
        <Item>
            <img src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title}/>
            <p>{data.title}</p>
        </Item>
    )
}