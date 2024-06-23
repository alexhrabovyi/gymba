import { lazy } from 'react';

const NewsArticlePageLazy = lazy(() => import('./NewsArticle'));

export default NewsArticlePageLazy;
