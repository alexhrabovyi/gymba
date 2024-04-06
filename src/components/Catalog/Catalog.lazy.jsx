import { lazy } from 'react';

const CatalogLazy = lazy(() => import('./Catalog.jsx'));

export default CatalogLazy;
