/* eslint-disable import/prefer-default-export */
import { getCompareProductCards } from '../../utils/dataAPI';

export function loader({ request }) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const subcategoryId = searchParams.get('subcategoryId');

  let productCards;

  try {
    productCards = getCompareProductCards(categoryId, subcategoryId);
  } catch (e) {
    if (e.message === 'Некорректний запит') {
      throw new Response('Сторінку не знайдено', { status: 404 });
    } else {
      throw e;
    }
  }

  return { productCards };
}
