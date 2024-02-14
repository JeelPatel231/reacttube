"use client"

import { useState } from "react";
import ChannelBar from "./ChannelBar";
import { VideoResponse } from "../lib/types/VideoResponse"
import { twMerge } from "tailwind-merge";

export type DescriptionBoxProps = Pick<VideoResponse,
  'title'
  | 'viewCount'
  | 'publishedText'
  | 'author'
  | 'subCountText'
  | 'authorThumbnails'
  | 'likeCount'
  | 'descriptionHtml'
>

export default function DescriptionBox({
  title, viewCount, publishedText, author, subCountText, likeCount, authorThumbnails, descriptionHtml
}: DescriptionBoxProps) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpand = () => setExpanded(!expanded)
  const classes = twMerge('whitespace-pre-line line-clamp-3', expanded && 'line-clamp-none')

  const ChannelBarProps = { author, subCountText, likeCount, authorThumbnails }
  return (
    <div className="flex flex-col gap-2 py-2 anchors">
      <h2>{title}</h2>
      <ChannelBar {...ChannelBarProps} />
      <div className="bg-gray-200 p-4 rounded-2xl">

        <div className="font-semibold">{viewCount} views | {publishedText}</div>

        <div onClick={toggleExpand}
          className={classes}
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>

      </div>
    </div>
  );
}
