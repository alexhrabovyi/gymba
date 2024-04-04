import { getSearchResultsPerPageAndPageAmount } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Search from '../../components/Search/Search.jsx';

export function loader({ request }) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get('search');
  const pageNum = +searchParams.get('page');

  const { searchResults, pageAmount } = getSearchResultsPerPageAndPageAmount(searchQuery, pageNum);

  return {
    searchResults,
    pageAmount,
  };
}

export function SearchPage() {
  return (
    <>
      <BreadCrumbs />
      <Search />
    </>
  );
}
