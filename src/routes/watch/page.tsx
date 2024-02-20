import { InvidiousAPI } from "../../lib/Invidious";
import "./style.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { VideoResponse } from "../../lib/types/VideoResponse";
import { VideoPlayer } from "../../components/VideoPlayer";

const SmallVideoComponent = lazy(() => import("../../components/SmallVideoRecommendations"));
const DescriptionBox = lazy(() => import("../../components/DescriptionBox"));
const CommentsRenderer = lazy(() => import("../../components/CommentsRenderer"));

function compareiTag(tag1: string, tag2: string): number {
  return parseInt(tag1) - parseInt(tag2)
}

export default function Watch() {
  const navigate = useNavigate()
  const [query, _] = useSearchParams();
  const v = query.get('v')
  const t = query.get('t')
  if (v == null || v == '') navigate('/')
  //

  const [videoData, setData] = useState<VideoResponse | null>(null)
  useEffect(() => {
    v && InvidiousAPI.getVideoDetails(v).then(x => setData(x))
  }, [v])

  const videoSrcs = videoData?.formatStreams
    .sort((a, b) => compareiTag(b.itag, a.itag))
    .map(x => x.url) ?? []

  const sourcesWithFallback = [
    ...videoSrcs,
    `https://tube.nocturn9x.space/latest_version?id=${v}&itag=22&local=true`,
    `https://tube.nocturn9x.space/latest_version?id=${v}&itag=18&local=true`
  ]

  const recommendedVideos = videoData?.recommendedVideos.map((x) => (
    <SmallVideoComponent key={x.videoId} {...x} />
  ))

  return (
    videoData && v &&
    <div key={v} className="grid-container gap-4 p-4">
      <div className="video-player">
        <VideoPlayer key={sourcesWithFallback[0]} className="video-player" sources={sourcesWithFallback} time={parseInt(t || '0')} />
        <DescriptionBox {...videoData} />
      </div>
      <div className="recommendations flex flex-col gap-4">
        <h2>Related Videos</h2>
        {recommendedVideos}
      </div>
      <div className="comments">
        <div className="flex flex-col gap-8">
          <h3>Comments</h3>
          <CommentsRenderer videoId={v} />
        </div>
      </div>
    </div>
  )
}