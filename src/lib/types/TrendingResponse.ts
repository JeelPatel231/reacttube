import { ThumbnailObject } from "./common/ThumbnailObject"

export type TrendingResponseVideo = {
  title: string,
  videoId: string,
  videoThumbnails: ThumbnailObject[],
  lengthSeconds: number,
  viewCount: number,
  author: string,
  authorId: string,
  authorUrl: string,
  published: number,
  publishedText: string,
  description: string,
  descriptionHtml: string,
  liveNow: boolean,
  paid: boolean,
  premium: boolean
}

export type TrendingResponse = TrendingResponseVideo[]