import { getProduct } from '../../utils/dataAPI.js';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Product from '../../components/Product/Product.jsx';

export function loader({ params }) {
  const { categoryId, subcategoryId, productId } = params;

  return getProduct(categoryId, subcategoryId, productId);
}

export function ProductPage() {
  return (
    <>
      <BreadCrumbs />
      <Product />
    </>
  );
}
