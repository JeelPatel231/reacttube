"use client"

import { PulsatingImage } from "../../../components/PulsatingImage";
import { InvidiousAPI } from "../../../lib/Invidious";
import { PlaylistSearchResult } from "../../../lib/types/SearchResultsResponse";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export default function PlaylistSearchResultComponent({
  playlistId,
  playlistThumbnail,
  author, 
  authorId,
  authorUrl,
  title, 
  videoCount,
  videos,
}: PlaylistSearchResult){
  const [authorThumbnail, setAuthorThumbnail] = useState<string>()

  useEffect(() => {
    InvidiousAPI.getAuthorThumbnail(authorId)
      .then(x => x.authorThumbnails.sort((a, b) => a.height * a.width - b.height * b.width))
      .then(x => setAuthorThumbnail((x[2] ?? x[1] ?? x[0]).url))
  }, [])

  return (
    <Link to={`/playlist?list=${playlistId}`} className="flex gap-4 flex-wrap sm:flex-nowrap">
      <PulsatingImage
        className="sm:w-60 lg:w-80 shrink-0 w-full"
        src={playlistThumbnail}
        alt={title} />
      <div className="flex flex-col gap-2">
        <span className="text-xl">{title}</span>
        <span className="text-sm muted">{videoCount} videos | Playlist</span>
        <span className="text-sm flex items-center gap-2">
          <PulsatingImage
            className="h-10 w-10 aspect-square rounded-full overflow-hidden"
            src={authorThumbnail}
            alt={title} />
          <span className="muted">
            {author}
          </span>
        </span>
        <span className="text-sm muted">
          {videos.map(x => <div>{x.title}</div>)}
        </span>
      </div>
    </Link>
  )
}