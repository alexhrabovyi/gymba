/* eslint-disable import/prefer-default-export */
import { getAnalogueProducts } from '../../utils/dataAPI';

export function loader() {
  throw new Response('Сторінку не знайдено', { status: 404 });
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId] = await request.json();

  return getAnalogueProducts(categoryId, subcategoryId, productId);
}
