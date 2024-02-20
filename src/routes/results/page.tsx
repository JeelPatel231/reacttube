import { InvidiousAPI } from "../../lib/Invidious"
import { useNavigate, useSearchParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { SearchResults } from "../../lib/types/SearchResultsResponse";


const VideoSearchResultComponent = lazy(() => import("./components/VideoSearchResult"));
const ChannelSearchResultComponent = lazy(() => import("./components/ChannelSearchResult"));
const PlaylistSearchResultComponent = lazy(() => import("./components/PlaylistSearchResult"));

export default function ResultsPage() {
  const navigate = useNavigate()
  const [query, _] = useSearchParams()
  const search_query = query.get('search_query');
  if (search_query == null || search_query === '') navigate('/');

  const [data, setData] = useState<SearchResults|null>(null) 
  useEffect(() => {
    search_query && InvidiousAPI.makeSearchQuery(search_query).then(x => setData(x))
  }, [search_query])

  return (
    data && 
    <div className="flex flex-col gap-8 p-4 lg:p-6 max-w-screen-md">
      {
        data.map((entry) => {
          if (entry.type === 'video') return (<VideoSearchResultComponent key={entry.videoId} {...entry} />)
          if (entry.type === 'channel') return (<ChannelSearchResultComponent key={entry.authorId} {...entry} />)
          if (entry.type === 'playlist') return (<PlaylistSearchResultComponent key={entry.playlistId} {...entry} />)
        })
      }
    </div>
  )
}