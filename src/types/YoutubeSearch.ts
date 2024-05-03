import { YoutubeThumbnails } from "./YoutubeThumbnail"

export type YoutubeSearch = {
    kind: string,
    id: YoutubeSearchId
    snippet: YoutubeSearchSnippet
}

export type YoutubeSearchId = {
    kind: string,
    videoId: string,
    channelId: string,
}

export type YoutubeSearchSnippet = {
    channelId: string,
    title: string,
    description: string,
    thumbnails: YoutubeThumbnails[],
}