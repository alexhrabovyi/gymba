/* eslint-disable max-len */
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  getCategoriesAndSubcategories,
  getNewsPreviews,
  getFilteredProductsAndMinMaxPrice,
  getWishlistIds,
  addIdToWishlist,
  deleteIdFromWishlist,
  deleteAllFromWishlist,
  getWishlistProductsPerPageAndPageAmount,
  getCartIds,
  addIdToCart,
  editProductAmountInCart,
  deleteFromCart,
  deleteAllFromCart,
  getCartProducts,
  getCompareIds,
  addIdToCompare,
  deleteFromCompare,
  getCompareSubcategories,
  deleteCompareSubcategory,
  deleteAllCompareSubcategories,
  getCompareProductCards,
  getProduct,
  getAnalogueProducts,
} from './dataAPI';

async function addMutation(request, addFunc) {
  const [categoryId, subcategoryId, productId] = await request.json();

  const response = await addFunc(categoryId, subcategoryId, productId);

  return response;
}

async function deleteMutation(request, deleteFunc, deleteAllFunc) {
  const requestData = await request.json();
  let response;

  if (requestData.deleteAll) {
    response = await deleteAllFunc();
  } else {
    const [categoryId, subcategoryId, productId] = requestData;
    response = await deleteFunc(categoryId, subcategoryId, productId);
  }

  return response;
}

export const handlers = [
  http.get('/fakeAPI/categories', async () => {
    const categories = await getCategoriesAndSubcategories();
    return HttpResponse.json(categories);
  }),
  http.get('/fakeAPI/news', async () => {
    const newsPreviews = await getNewsPreviews();
    return HttpResponse.json(newsPreviews);
  }),
  http.get('/fakeAPI/getProducts/:categoryId/:subcategoryId', async ({ request, params }) => {
    const { categoryId, subcategoryId } = params;
    const { searchParams } = new URL(request.url);

    return getFilteredProductsAndMinMaxPrice(categoryId, subcategoryId, searchParams);
  }),
  http.get('/fakeAPI/wishlistIds', async () => {
    const wishlistIds = await getWishlistIds();

    return HttpResponse.json(wishlistIds);
  }),
  http.post('/fakeAPI/wishlistIds', async ({ request }) => addMutation(request, addIdToWishlist)),
  http.delete('/fakeAPI/wishlistIds', async ({ request }) => deleteMutation(request, deleteIdFromWishlist, deleteAllFromWishlist)),
  http.get('/fakeAPI/getWishlistProducts', async ({ request }) => {
    const pageNum = new URL(request.url).searchParams.get('page');

    return getWishlistProductsPerPageAndPageAmount(+pageNum);
  }),
  http.get('/fakeAPI/cartIds', async () => {
    const cartIds = await getCartIds();

    return HttpResponse.json(cartIds);
  }),
  http.post('/fakeAPI/cartIds', async ({ request }) => addMutation(request, addIdToCart)),
  http.patch('/fakeAPI/cartIds', async ({ request }) => {
    const [categoryId, subcategoryId, productId, amount] = await request.json();

    return editProductAmountInCart(categoryId, subcategoryId, productId, amount);
  }),
  http.delete('/fakeAPI/cartIds', async ({ request }) => deleteMutation(request, deleteFromCart, deleteAllFromCart)),
  http.get('/fakeAPI/getCartProducts', async () => {
    const cartProducts = await getCartProducts();

    return HttpResponse.json(cartProducts);
  }),
  http.get('/fakeAPI/compareIds', async () => {
    const cartIds = await getCompareIds();

    return HttpResponse.json(cartIds);
  }),
  http.post('/fakeAPI/compareIds', async ({ request }) => addMutation(request, addIdToCompare)),
  http.delete('/fakeAPI/compareIds', async ({ request }) => deleteMutation(request, deleteFromCompare)),
  http.get('/fakeAPI/compareSubcategories', async () => getCompareSubcategories()),
  http.delete('/fakeAPI/compareSubcategories', async ({ request }) => {
    const requestData = await request.json();
    let response;

    if (requestData.deleteAll) {
      response = await deleteAllCompareSubcategories();
    } else {
      const [categoryId, subcategoryId] = requestData;
      response = await deleteCompareSubcategory(categoryId, subcategoryId);
    }

    return response;
  }),
  http.get('/fakeAPI/getCompareProducts/:categoryId/:subcategoryId', async ({ params }) => {
    const { categoryId, subcategoryId } = params;

    return getCompareProductCards(categoryId, subcategoryId);
  }),
  http.get('/fakeAPI/getProduct/:categoryId/:subcategoryId/:productId', async ({ params }) => {
    const { categoryId, subcategoryId, productId } = params;

    return getProduct(categoryId, subcategoryId, productId);
  }),
  http.get('/fakeAPI/getAnalogueProducts/:categoryId/:subcategoryId/:productId', async ({ params }) => {
    const { categoryId, subcategoryId, productId } = params;

    return getAnalogueProducts(categoryId, subcategoryId, productId);
  }),
];

export const worker = setupWorker(...handlers);
