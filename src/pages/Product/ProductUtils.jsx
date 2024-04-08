/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getProduct } from '../../utils/dataAPI.js';

export async function loader({ params }) {
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

  return defer({
    product,
  });
}
