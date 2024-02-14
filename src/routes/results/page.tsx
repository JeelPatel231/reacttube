import { InvidiousAPI } from "../../lib/Invidious"
import VideoSearchResultComponent from "./components/VideoSearchResult";
import ChannelSearchResultComponent from "./components/ChannelSearchResult";
import PlaylistSearchResultComponent from "./components/PlaylistSearchResult";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchResults } from "../../lib/types/SearchResultsResponse";

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
          if (entry.type === 'video') return (<VideoSearchResultComponent {...entry} />)
          if (entry.type === 'channel') return (<ChannelSearchResultComponent {...entry} />)
          if (entry.type === 'playlist') return (<PlaylistSearchResultComponent {...entry} />)
        })
      }
    </div>
  )
}