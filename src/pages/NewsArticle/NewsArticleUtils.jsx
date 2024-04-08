/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getNewsArticle, getRecommendedNews } from '../../utils/dataAPI.js';

export function loader({ params }) {
  const { articleId } = params;

  const articleObj = getNewsArticle(articleId);
  const recommendedNews = getRecommendedNews(articleId);

  return defer({
    articleObj,
    recommendedNews,
  });
}
