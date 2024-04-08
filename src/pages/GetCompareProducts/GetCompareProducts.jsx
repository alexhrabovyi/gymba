/* eslint-disable import/prefer-default-export */
import { defer } from 'react-router-dom';
import { getCompareProductCards } from '../../utils/dataAPI';
import Error from '../../components/Error/Error.jsx';

export async function loader({ request }) {
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

  return defer({ productCards });
}

export function GetCompareProductsPage() {
  return (
    <Error />
  );
}
