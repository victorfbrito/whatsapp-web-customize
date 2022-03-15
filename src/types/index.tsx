interface ArtistType {
    name: string
    link: string
}

interface ThemeItemType {
    data: {
        title: string
        path: string
        type: string
        artist: ArtistType
    }
}

export type {
    ArtistType,
    ThemeItemType
}