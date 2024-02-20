import { Link } from "react-router-dom"

export const SearchSuggestionEntry = ({ value, onClick }: { value: string, onClick: () => void }) => (
  <Link
    onClick={onClick}
    to={`/results?search_query=${value}`}
    key={value}
    dangerouslySetInnerHTML={{ __html: value }}
    className="block transition-colors rounded-full px-2 hover:muted hover:bg-gray-200 text-lg">
  </Link>
)

export default SearchSuggestionEntry;