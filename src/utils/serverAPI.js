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
  getWishlistProductsPerPageAndPageAmount,
  getCartIds,
  addIdToCart,
  deleteFromCart,
  getCompareIds,
  addIdToCompare,
  deleteFromCompare,
  getProduct,
  getAnalogueProducts,
} from './dataAPI';

async function addOrDeleteMutation(request, mutationFunc) {
  const [categoryId, subcategoryId, productId] = await request.json();

  const response = await mutationFunc(categoryId, subcategoryId, productId);

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
  http.patch('/fakeAPI/wishlistIds', async ({ request }) => addOrDeleteMutation(request, addIdToWishlist)),
  http.delete('/fakeAPI/wishlistIds', async ({ request }) => addOrDeleteMutation(request, deleteIdFromWishlist)),
  http.get('/fakeAPI/getWishlistProducts', async ({ request }) => {
    const pageNum = new URL(request.url).searchParams.get('page');

    return getWishlistProductsPerPageAndPageAmount(+pageNum);
  }),
  http.get('/fakeAPI/cartIds', async () => {
    const cartIds = await getCartIds();

    return HttpResponse.json(cartIds);
  }),
  http.patch('/fakeAPI/cartIds', async ({ request }) => addOrDeleteMutation(request, addIdToCart)),
  http.delete('/fakeAPI/cartIds', async ({ request }) => addOrDeleteMutation(request, deleteFromCart)),
  http.get('/fakeAPI/compareIds', async () => {
    const cartIds = await getCompareIds();

    return HttpResponse.json(cartIds);
  }),
  http.patch('/fakeAPI/compareIds', async ({ request }) => addOrDeleteMutation(request, addIdToCompare)),
  http.delete('/fakeAPI/compareIds', async ({ request }) => addOrDeleteMutation(request, deleteFromCompare)),
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
