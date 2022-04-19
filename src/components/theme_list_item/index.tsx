import * as ts from '../../types'
import * as sc from './styles'

export default function ThemeListItem({ data, doAction }: ts.ThemeItemType) {
    return(
        <sc.Item onClick={doAction ? doAction : undefined}>
            <img src={'backgrounds/' + data.path + '/thumbnail.gif'} alt={data.title}/>
            <p>{data.title}</p>
        </sc.Item>
    )
}