import {
  getCartIds, getCartAmount, addIdToCart, deleteAllFromCart,
  deleteFromCart, getCartProductsAndTotalPrice, editProductAmountInCart,
} from '../../utils/dataAPI';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs.jsx';
import Cart from '../../components/Cart/Cart.jsx';

export function loader() {
  const cartIds = getCartIds();
  const cartAmount = getCartAmount();
  const { cartProducts, totalPrice } = getCartProductsAndTotalPrice();

  return {
    cartIds,
    cartAmount,
    cartProducts,
    totalPrice,
  };
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

export function CartPage() {
  return (
    <>
      <BreadCrumbs />
      <Cart />
    </>
  );
}
