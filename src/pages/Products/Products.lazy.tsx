import { lazy } from 'react';

const ProductsPageLazy = lazy(() => import('./Products'));

export default ProductsPageLazy;
