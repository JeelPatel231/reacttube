import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { InvidiousAPI } from "../lib/Invidious";
import { useOnMount } from "../lib/OnMount";
import { TrendingResponseVideo } from "../lib/types/TrendingResponse";

export default function Home() {
  const [data, setData] = useState<TrendingResponseVideo[]>([])
  useOnMount(() => {
    InvidiousAPI.getTrending().then(x => setData(x))
  }) 

  const videoElements = data.map((video) => (
    <VideoCard {...video} />
  ))

  return (
    <>
    <h1 className="px-8 py-4">Trending</h1>
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 px-4 py-4 sm:px-8 justify-center">
      {videoElements}
    </div>
    </>
  );
}
