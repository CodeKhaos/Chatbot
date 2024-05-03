import { YoutubeThumbnails } from "./YoutubeThumbnail"

export type YoutubeVideo = {
    kind: string,
    id: string
    snippet: YoutubeVideoSnippet,
    contentDetails: YoutubeVideoContentDetails,
    player: YoutubeVideoPlayer
}

export type YoutubeVideoSnippet = {
    channelId: string,    
    title: string,
    description: string,
    thumbnails: YoutubeThumbnails    
}

export type YoutubeVideoContentDetails = {
    duration: string,    
}

export type YoutubeVideoPlayer = {
    embedHtml: string,
    embedHeight: number,
    embedWidth: number,
}