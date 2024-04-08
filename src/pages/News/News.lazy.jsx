import { lazy } from 'react';

const NewsPageLazy = lazy(() => import('./News.jsx'));

export default NewsPageLazy;
