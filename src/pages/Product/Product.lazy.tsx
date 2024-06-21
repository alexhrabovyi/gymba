import { lazy } from 'react';

const ProductPageLazy = lazy(() => import('./Product'));

export default ProductPageLazy;
