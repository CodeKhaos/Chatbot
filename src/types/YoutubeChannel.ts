import { YoutubeThumbnails } from "./YoutubeThumbnail"

export type YoutubeChannel = {
    id: string
    kind: string
    snippet: YoutubeChannelSnippet
}
export type YoutubeChannelSnippet = {
    country: string
    customUrl: string
    description: string
    thumbnails: YoutubeThumbnails[]
    title: string
}

