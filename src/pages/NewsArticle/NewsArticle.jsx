import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import NewsArticle from '../../components/NewsArticle/NewsArticle.jsx';
import { getNewsArticle, getRecommendedNews } from '../../utils/dataAPI.js';

export function loader({ params }) {
  const { articleId } = params;

  const articleObj = getNewsArticle(articleId);
  const recommendedNews = getRecommendedNews(articleId);

  return {
    articleObj,
    recommendedNews,
  };
}

export function NewsArticlePage() {
  return (
    <>
      <BreadCrumbs />
      <NewsArticle />
    </>
  );
}
