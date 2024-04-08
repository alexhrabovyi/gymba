import { lazy } from 'react';

const ProductPageLazy = lazy(() => import('./Product.jsx'));

export default ProductPageLazy;
