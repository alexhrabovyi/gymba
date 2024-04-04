import { getSearchResults } from '../../utils/dataAPI';

export function loader({ request }) {
  const searchQuery = (new URL(request.url)).searchParams.get('search');

  const searchResults = getSearchResults(searchQuery);

  return {
    searchResults,
  };
}
