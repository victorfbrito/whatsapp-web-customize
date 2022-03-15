interface ArtistType {
    name: string
    link: string
}

interface ThemeItemType {
    data: ThemeItemProps
}

interface ThemeItemProps {
    title: string
    path: string
    type: string
    artist?: ArtistType | null
    custom_props?: any
}

interface ThemeItemDispatch extends ThemeItemType {
    type: 'REMOVE_THEME' | 'SELECT_THEME'
}

interface Clickable {
    onClick: React.MouseEventHandler<HTMLElement>;
}

export type {
    ArtistType,
    ThemeItemType,
    ThemeItemProps,
    ThemeItemDispatch,
    Clickable
}