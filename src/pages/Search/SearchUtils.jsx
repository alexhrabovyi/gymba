/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getSearchResultsPerPageAndPageAmount } from '../../utils/dataAPI';

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get('search');
  const pageNum = +searchParams.get('page');

  const searchResultAndPageAmount = getSearchResultsPerPageAndPageAmount(searchQuery, pageNum);

  return defer({
    searchResultAndPageAmount,
  });
}
