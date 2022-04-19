interface ArtistType {
    name: string
    link: string
}

interface ThemeItemType {
    data: ThemeItemProps,
    doAction?: React.MouseEventHandler<HTMLElement>
}

interface ThemeItemProps {
    title: string
    path: string
    type: string
    artist?: ArtistType | null
    custom_props?: any
    color_schemes?: Color[][]
}

interface ThemeItemDispatch extends ThemeItemType {
    type: 'REMOVE_THEME' | 'SELECT_THEME'
}

interface Clickable {
    onClick: React.MouseEventHandler<HTMLElement>;
}

type Color = string;

interface SchemeSliceProps {
    color: Color
    whole?: boolean
}
 
export type {
    ArtistType,
    ThemeItemType,
    ThemeItemProps,
    ThemeItemDispatch,
    Clickable,
    Color,
    SchemeSliceProps
}