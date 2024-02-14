import { ThumbnailObject } from "./common/ThumbnailObject"

export type Comment = {
  author: string,
  authorThumbnails: ThumbnailObject[],
  authorId: string,
  authorUrl: string,

  isEdited: boolean,
  isPinned: boolean,

  content: string,
  contentHtml: string,
  published: number,
  publishedText: string,
  likeCount: number,
  commentId: string,
  authorIsChannelOwner: boolean,
  creatorHeart?: {
    creatorThumbnail: string,
    creatorName: string
  },
  replies?: {
    replyCount: number,
    continuation: string
  }
}

export type CommentResponse = {
  commentCount?: number,
  videoId: string,
  comments: Comment[],
  continuation?: string
} 