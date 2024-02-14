import { CommentResponse } from "./types/CommentResponse";
import { ThumbnailObject } from "./types/common/ThumbnailObject";
import { SearchSuggestionsResponse } from "./types/SearchResponse";
import { SearchResults } from "./types/SearchResultsResponse";
import { TrendingResponse } from "./types/TrendingResponse";
import { VideoResponse } from "./types/VideoResponse";

export class Invidious {
  private baseUrl: string;

  constructor(host: string) {
    const url = new URL(host)
    this.baseUrl = `${url.protocol}//${url.host}/api/v1`
  }

  editRequestUrl(url: string): string {
    const newChar = (url.includes("?")) ? "&" : "?";
    return url + newChar + "hl=en-US";
  }

  async getTrending(): Promise<TrendingResponse> {
    const response = await fetch(this.editRequestUrl(this.baseUrl + `/trending`))
    return await response.json()
  }

  getVideoThumbnailUrl(videoId: string) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  async getAuthorThumbnail(authorId: string): Promise<{ authorThumbnails: ThumbnailObject[] }> {
    const response = await fetch(this.baseUrl + `/channels/${authorId}/?fields=authorThumbnails`)
    return await response.json()
  }

  getResource(path: string) {
    return `https://img.youtube.com${path}`
  }

  // GET VIDEO DETAILS
  async getVideoDetails(id: string): Promise<VideoResponse> {
    const response = await fetch(this.editRequestUrl(this.baseUrl + `/videos/${id}`))
    return await response.json()
  }

  async getVideoComments(id: string, continuation: string | null = null): Promise<CommentResponse> {
    const continuationQS = continuation ? `?continuation=${continuation}` : ''
    const url = this.baseUrl + `/comments/${id}` + continuationQS
    const response = await fetch(this.editRequestUrl(url))
    return await response.json()
  }

  // Search
  async getSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
    const searchUrl = this.editRequestUrl(this.baseUrl + `/search/suggestions?q=` + query)
    const response = await fetch(searchUrl)
    return await response.json()
  }

  async makeSearchQuery(query: string) : Promise<SearchResults> {
    const searchUrl = this.editRequestUrl(this.baseUrl + `/search?q=` + query)
    const response = await fetch(searchUrl)
    return await response.json()
  }
}


export const InvidiousAPI = new Invidious("https://tube.nocturn9x.space")