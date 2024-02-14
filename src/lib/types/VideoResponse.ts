import { ImageObject } from "./common/ImageObject"
import { ThumbnailObject } from "./common/ThumbnailObject"

export type VideoResponse = {
  title: string,
  videoId: string,
  videoThumbnails: ThumbnailObject[],

  description: string,
  descriptionHtml: string,
  published: number,
  publishedText: string,

  keywords: string[],
  viewCount: number,
  likeCount: number,
  dislikeCount: number,

  paid: boolean,
  premium: boolean,
  isFamilyFriendly: boolean,
  allowedRegions: string[],
  genre: string,
  genreUrl: string,

  author: string,
  authorId: string,
  authorUrl: string,
  authorThumbnails: ImageObject[],

  subCountText: string,
  lengthSeconds: number,
  allowRatings: boolean,
  rating: number,
  isListed: boolean,
  liveNow: boolean,
  isUpcoming: boolean,
  premiereTimestamp?: number,

  hlsUrl?: string,
  adaptiveFormats: [
    {
      index: string,
      bitrate: string,
      init: string,
      url: string,
      itag: string,
      type: string,
      clen: string,
      lmt: string,
      projectionType: number,
      container: string,
      encoding: string,
      qualityLabel?: string,
      resolution?: string
    }
  ],
  formatStreams: [
    {
      url: string,
      itag: string,
      type: string,
      quality: string,
      container: string,
      encoding: string,
      qualityLabel: string,
      resolution: string,
      size: string
    }
  ],
  captions: [
    {
      label: string,
      languageCode: string,
      url: string
    }
  ],
  recommendedVideos: RecommendedVideos[]
}

export type RecommendedVideos = {
  videoId: string,
  title: string,
  videoThumbnails: ThumbnailObject[],
  author: string,
  lengthSeconds: number,
  viewCountText: string
}