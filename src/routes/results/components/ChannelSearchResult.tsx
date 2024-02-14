import { PulsatingImage } from "../../../components/PulsatingImage";
import { ChannelSearchResult } from "../../../lib/types/SearchResultsResponse";
import { Link } from "react-router-dom"

export default function ChannelSearchResultComponent({
  authorThumbnails,
  author,
  authorId,
  authorUrl,
  subCount,
  description,
}: ChannelSearchResult) {
  const thumbnail = authorThumbnails.find(() => true)?.url
  return (
    <Link to={authorUrl} className="flex gap-4">
      <div>
        <PulsatingImage
          imageClass="w-auto rounded-full"
          className="sm:w-60 lg:w-80 h-40 flex justify-center shrink-0 w-full"
          src={thumbnail}
          alt={author} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xl">{author}</span>
        <span className="text-sm muted">{subCount} subscribers </span>
        <span className="text-sm muted">
          {description}
        </span>
      </div>
    </Link>
  )
}