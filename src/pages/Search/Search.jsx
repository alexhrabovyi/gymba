import { defer } from 'react-router-dom';
import { getSearchResultsPerPageAndPageAmount } from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Search from '../../components/Search/Search.jsx';

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get('search');
  const pageNum = +searchParams.get('page');

  const searchResultAndPageAmount = getSearchResultsPerPageAndPageAmount(searchQuery, pageNum);

  return defer({
    searchResultAndPageAmount,
  });
}

export function SearchPage() {
  return (
    <>
      <BreadCrumbs />
      <Search />
    </>
  );
}
