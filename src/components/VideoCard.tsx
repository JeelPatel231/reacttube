'use client'

import { InvidiousAPI } from "../lib/Invidious";
import { TrendingResponseVideo } from "../lib/types/TrendingResponse";
import { PulsatingImage } from "./PulsatingImage";
import { Link } from "react-router-dom"


export default function VideoCard({
  videoId,
  videoThumbnails,
  title,
  author,
  authorId,
  viewCount,
  publishedText,
}: TrendingResponseVideo) {

  const thumbnail = InvidiousAPI.getVideoThumbnailUrl(videoId)

  return (
    <Link to={`/watch?v=${videoId}`}>
    <div className="flex grow flex-col w-max-80 gap-2 p-2 justify-self-center w-full hover:shadow-2xl rounded-xl transition-all duration-300">
      <PulsatingImage 
         src={thumbnail} 
         alt={title} />
      <div className="flex gap-2">
        {/* <PulsatingImage
          className="w-14 h-14 rounded-full overflow-hidden shrink-0 aspect-square"
          src={authorThumbnail} 
          alt="" /> */}
        <div className="p-2 gap-2 flex flex-col">
          <div className="line-clamp-3"><b>{title}</b></div>
          <span className="muted"><b>{author}</b></span>
          <span className="muted">{viewCount} views | {publishedText}</span>
        </div>
      </div>
    </div>
    </Link>
  )
}