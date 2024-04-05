import { getProduct } from '../../utils/dataAPI.js';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Product from '../../components/Product/Product.jsx';

export function loader({ params }) {
  const { categoryId, subcategoryId, productId } = params;

  let product;

  try {
    product = getProduct(categoryId, subcategoryId, productId);
  } catch (e) {
    if (e.message === 'Категорію не знайдено') {
      throw new Response('Сторінку не знайдено', { status: 404 });
    } else {
      throw e;
    }
  }

  return product;
}

export function ProductPage() {
  return (
    <>
      <BreadCrumbs />
      <Product />
    </>
  );
}
