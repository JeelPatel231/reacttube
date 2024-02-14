import { ThumbnailObject } from "./ThumbnailObject"

export type VideoObject = {
    type: "video", // Constant

    title: string,
    videoId: string,

    author: string,
    authorId: string,
    authorUrl: string,
    authorVerified: boolean,

    videoThumbnails: ThumbnailObject[],

    description: string,
    descriptionHtml: string,

    viewCount: number, // Integer
    viewCountText: string,
    lengthSeconds: number, // Integer

    published: number, // Unix timestamp
    publishedText: string,

    // Only available on premiered videos
    premiereTimestamp: number, // Unix timestamp

    liveNow: boolean,
    premium: boolean,
    isUpcoming: boolean
}