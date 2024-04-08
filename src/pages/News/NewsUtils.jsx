/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getNewsPreviewsPerPageAndPageAmount } from '../../utils/dataAPI.js';

export async function loader({ request }) {
  const pageNum = (new URL(request.url)).searchParams.get('page');

  const newsPreviewsPerPageAndPageAmount = getNewsPreviewsPerPageAndPageAmount(pageNum);

  return defer({
    newsPreviewsPerPageAndPageAmount,
  });
}
