"use client"

import { PulsatingImage } from "../../../components/PulsatingImage";
import { InvidiousAPI } from "../../../lib/Invidious";
import { VideoSearchResult } from "../../../lib/types/SearchResultsResponse";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export default function VideoSearchResultComponent({
  title,
  videoThumbnails,
  videoId,
  viewCount,
  publishedText,
  author,
  authorId,
  authorUrl,
  descriptionHtml,
  lengthSeconds,
}: VideoSearchResult) {
  const thumbnail = InvidiousAPI.getVideoThumbnailUrl(videoId)
  const [authorThumbnail, setAuthorThumbnail] = useState<string>()

  useEffect(() => {
    InvidiousAPI.getAuthorThumbnail(authorId)
      .then(x => (x.authorThumbnails ?? []).sort((a, b) => a.height * a.width - b.height * b.width))
      .then(x => setAuthorThumbnail((x[2] ?? x[1] ?? x[0])?.url))
  }, [])

  return (
    <Link to={`/watch?v=${videoId}`} className="flex gap-4 flex-wrap sm:flex-nowrap shadow-2xl sm:shadow-none rounded-2xl">
      <PulsatingImage
        className="sm:w-60 lg:w-80 shrink-0 w-full"
        src={thumbnail}
        alt={title} />
      <div className="flex flex-col gap-2 px-4 pb-4">
        <span className="text-xl">{title}</span>
        <span className="text-sm muted">{viewCount} views | {publishedText}</span>
        <span className="text-sm flex items-center gap-2">
          <PulsatingImage
            className="h-10 w-10 aspect-square rounded-full overflow-hidden"
            src={authorThumbnail}
            alt={title} />
          <span className="muted">
            {author}
          </span>
        </span>
        <span dangerouslySetInnerHTML={{ __html: descriptionHtml }} className="text-sm muted">
        </span>
      </div>
    </Link>
  )
}