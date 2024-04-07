import { lazy } from 'react';

const ProductsPageLazy = lazy(() => import('./Products.jsx'));

export default ProductsPageLazy;
