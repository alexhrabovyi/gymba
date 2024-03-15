import {
  getWishlistIds, getWishlistAmount, addIdToWishlist, deleteFromWishlist,
} from '../../utils/dataAPI';

export function loader() {
  const wishlistIds = getWishlistIds();
  const wishlistAmount = getWishlistAmount();

  return {
    wishlistIds,
    wishlistAmount,
  };
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId] = await request.json();

  if (request.method === 'PATCH') {
    addIdToWishlist(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE') {
    deleteFromWishlist(categoryId, subcategoryId, productId);
  }

  return null;
}
