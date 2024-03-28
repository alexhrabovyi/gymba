/* eslint-disable import/prefer-default-export */
import { getCompareProductCards } from '../../utils/dataAPI';

export function loader({ request }) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const subcategoryId = searchParams.get('subcategoryId');

  const productCards = getCompareProductCards(categoryId, subcategoryId);

  return { productCards };
}
