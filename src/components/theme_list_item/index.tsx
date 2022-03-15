import * as ts from '../../types'
import * as sc from './styles'

export default function ThemeListItem({ data }: ts.ThemeItemType) {
    return(
        <sc.Item>
            <img src={'backgrounds/' + data.path + '/thumbnail.png'} alt={data.title}/>
            <p>{data.title}</p>
        </sc.Item>
    )
}