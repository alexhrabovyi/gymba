import { lazy } from 'react';

const NewsArticlePageLazy = lazy(() => import('./NewsArticle.jsx'));

export default NewsArticlePageLazy;
