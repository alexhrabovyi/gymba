import AllNews from '../../components/AllNews/AllNews.jsx';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import { getNewsPreviewsPerPageAndPageAmount } from '../../utils/dataAPI.js';

export function loader({ request }) {
  const pageNum = (new URL(request.url)).searchParams.get('page');

  const { pageAmount, newsPreviews } = getNewsPreviewsPerPageAndPageAmount(pageNum);

  return {
    pageAmount,
    newsPreviews,
  };
}

export function NewsPage() {
  return (
    <>
      <BreadCrumbs />
      <AllNews />
    </>
  );
}
