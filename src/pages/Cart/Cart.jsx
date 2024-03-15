import {
  addIdToCart, deleteFromCart, getCartIds, getCartAmount,
} from '../../utils/dataAPI';

export function loader() {
  const cartIds = getCartIds();
  const cartAmount = getCartAmount();

  return {
    cartIds,
    cartAmount,
  };
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId] = await request.json();

  if (request.method === 'PATCH') {
    addIdToCart(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE') {
    deleteFromCart(categoryId, subcategoryId, productId);
  }

  return null;
}
