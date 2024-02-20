import { lazy } from "react";
import { VideoResponse } from "../lib/types/VideoResponse";
import PillButton from "./PillButtons";

export type ChannelBarProps = Pick<VideoResponse, 'author' | 'subCountText' | 'likeCount' | 'authorThumbnails'>

export default function ChannelBar({
  author, subCountText, likeCount, authorThumbnails
}: ChannelBarProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <img className="h-10 rounded-full" src={authorThumbnails[0].url} alt={author} />
      <span>
        <h3>{author}</h3>
        <div className="muted text-sm">{subCountText} subscribers</div>
      </span>
      <div className="flex gap-4 ml-auto self-center">
        <PillButton>
          <span className="material-symbols-outlined">thumb_up</span>
          {likeCount}
        </PillButton>
        <PillButton>
          <span className="material-symbols-outlined">share</span>
          Share
        </PillButton>
        <PillButton>
          <span className="material-symbols-outlined">download</span>
          Download
        </PillButton>
      </div>
    </div>
  )
}