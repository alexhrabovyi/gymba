import { defer } from 'react-router-dom';
import {
  getCartIds, getCartAmount, addIdToCart, deleteAllFromCart,
  deleteFromCart, getCartProductsAndTotalPrice, editProductAmountInCart,
} from '../../utils/dataAPI';

export async function loader() {
  const cartIds = getCartIds();
  const cartAmount = getCartAmount();
  const cartProductsAndTotalPrice = getCartProductsAndTotalPrice();

  return defer({
    cartIds,
    cartAmount,
    cartProductsAndTotalPrice,
  });
}

export async function action({ request }) {
  const [categoryId, subcategoryId, productId, amount] = await request.json();

  if (request.method === 'PATCH' && amount) {
    editProductAmountInCart(categoryId, subcategoryId, productId, amount);
  } else if (request.method === 'PATCH') {
    addIdToCart(categoryId, subcategoryId, productId);
  } else if (request.method === 'DELETE' && !categoryId && !subcategoryId && !productId) {
    deleteAllFromCart();
  } else if (request.method === 'DELETE') {
    deleteFromCart(categoryId, subcategoryId, productId);
  }

  return null;
}
