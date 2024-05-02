import { defer } from 'react-router-dom';
import {
  getWishlistIds,
  getWishlistAmount,
  getWishlistProductsPerPageAndPageAmount,
  addIdToWishlist,
  deleteAllFromWishlist,
} from '../../utils/dataAPI';

export function loader({ request }) {
  const page = (new URL(request.url)).searchParams.get('page');

  const wishlistIds = getWishlistIds();
  const wishlistAmount = getWishlistAmount();
  const wishlistProductsPerPageAndPageAmount = getWishlistProductsPerPageAndPageAmount(page);

  return defer({
    wishlistIds,
    wishlistAmount,
    wishlistProductsPerPageAndPageAmount,
  });
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId] = await request.json();

  if (request.method === 'PATCH') {
    addIdToWishlist(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE' && !categoryId && !subcategoryId && !productId) {
    deleteAllFromWishlist();
  } else if (request.method === 'DELETE') {
    deleteFromWishlist(categoryId, subcategoryId, productId);
  }

  return null;
}
