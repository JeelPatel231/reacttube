import { RecommendedVideos } from "../lib/types/VideoResponse";
import { PulsatingImage } from "./PulsatingImage";
import { InvidiousAPI } from "../lib/Invidious";
import { Link } from "react-router-dom"

export default function SmallVideoComponent({
  title,
  videoId,
  viewCountText,
  lengthSeconds,
  author
}: RecommendedVideos) {
  return (
    <Link key={videoId} to={`/watch?v=${videoId}`} className="flex gap-2">
      <PulsatingImage
        className="shrink-0 basis-32 h-full"
        src={InvidiousAPI.getVideoThumbnailUrl(videoId)}
        alt={title} />
      <div className="text-sm">
        <div className="line-clamp-2"><b>{title}</b></div>
        <div>{author}</div>
        <div>{viewCountText} views</div>
      </div>
    </Link>
  )
} 