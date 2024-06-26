/* eslint-disable max-len */
import { http, HttpResponse, StrictRequest } from 'msw';
import { setupWorker } from 'msw/browser';
import {
  type CategoryShort,
  type WishlistId,
  getCategoriesAndSubcategories,
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
  getNewsPreviewsPerPageAndPageAmount,
  getNewsArticle,
  getRecommendedNews,
  getProduct,
  getAnalogueProducts,
  getRandomProduct,
  getSearchResultsPerPageAndPageAmount,
  CompareId,
  CartId,
  ProductWithIds,
  SearchResults,
  NewsArticlesWithAmount,
  FilteredProductsAndMinMaxPrice,
  ProductWithIdsAndNames,
  Product,
  WishlistProductsAndPageAmout,
  CartProduct,
  CompareSubcategory,
  NewsArticle,
  NewsArticleShort,
} from './dataAPI';

async function addMutation(
  request: StrictRequest<any>,
  addFunc: (categoryId: string, subcategoryId: string, productId: string) => Promise<Response>,
) {
  const [categoryId, subcategoryId, productId] = await request.json();

  const response = await addFunc(categoryId as string, subcategoryId as string, productId as string);

  return response;
}

async function deleteMutation(
  request: StrictRequest<any>,
  deleteFunc: (categoryId: string, subcategoryId: string, productId: string) => Promise<Response>,
  deleteAllFunc?: () => Promise<Response>,
) {
  const requestData = await request.json();
  let response: Response;

  if (requestData.deleteAll && deleteAllFunc) {
    response = await deleteAllFunc();
  } else {
    const [categoryId, subcategoryId, productId] = requestData;
    response = await deleteFunc(categoryId as string, subcategoryId as string, productId as string);
  }

  return response;
}

export const handlers = [
  http.get('/fakeAPI/categories', async () => {
    const categories = await getCategoriesAndSubcategories();
    return HttpResponse.json<CategoryShort[]>(categories);
  }),
  http.get('/fakeAPI/getProducts/:categoryId/:subcategoryId', async ({ request, params }) => {
    const { categoryId, subcategoryId } = params;
    const { searchParams } = new URL(request.url);

    const filteredProductsAndMinMaxPrice = await getFilteredProductsAndMinMaxPrice(categoryId as string, subcategoryId as string, searchParams);
    return HttpResponse.json<FilteredProductsAndMinMaxPrice>(filteredProductsAndMinMaxPrice);
  }),
  http.get('/fakeAPI/wishlistIds', async () => {
    const wishlistIds = await getWishlistIds();

    return HttpResponse.json<WishlistId[] | []>(wishlistIds);
  }),
  http.post('/fakeAPI/wishlistIds', async ({ request }) => addMutation(request, addIdToWishlist)),
  http.delete('/fakeAPI/wishlistIds', async ({ request }) => deleteMutation(request, deleteIdFromWishlist, deleteAllFromWishlist)),
  http.get('/fakeAPI/getWishlistProducts', async ({ request }) => {
    const pageNum = Number(new URL(request.url).searchParams.get('page')) || null;

    const wishlistProductsAndPageAmout = await getWishlistProductsPerPageAndPageAmount(pageNum);

    return HttpResponse.json<WishlistProductsAndPageAmout>(wishlistProductsAndPageAmout);
  }),
  http.get('/fakeAPI/cartIds', async () => {
    const cartIds = await getCartIds();

    return HttpResponse.json<CartId[] | []>(cartIds);
  }),
  http.post('/fakeAPI/cartIds', async ({ request }) => addMutation(request, addIdToCart)),
  http.patch('/fakeAPI/cartIds', async ({ request }) => {
    const [categoryId, subcategoryId, productId, amount] = await request.json() as any[];

    return editProductAmountInCart(categoryId as string, subcategoryId as string, productId as string, Number(amount));
  }),
  http.delete('/fakeAPI/cartIds', async ({ request }) => deleteMutation(request, deleteFromCart, deleteAllFromCart)),
  http.get('/fakeAPI/getCartProducts', async () => {
    const cartProducts = await getCartProducts();

    return HttpResponse.json<CartProduct[]>(cartProducts);
  }),
  http.get('/fakeAPI/compareIds', async () => {
    const compareIds = await getCompareIds();

    return HttpResponse.json<CompareId[] | []>(compareIds);
  }),
  http.post('/fakeAPI/compareIds', async ({ request }) => addMutation(request, addIdToCompare)),
  http.delete('/fakeAPI/compareIds', async ({ request }) => deleteMutation(request, deleteFromCompare)),
  http.get('/fakeAPI/compareSubcategories', async () => {
    const compareSubcategories = await getCompareSubcategories();

    return HttpResponse.json<CompareSubcategory[]>(compareSubcategories);
  }),
  http.delete('/fakeAPI/compareSubcategories', async ({ request }) => {
    type RequestData = { deleteAll: boolean } | [string, string];

    const requestData: RequestData = await request.json() as RequestData;
    let response;

    if ('deleteAll' in requestData && requestData.deleteAll) {
      response = await deleteAllCompareSubcategories();
    } else {
      const [categoryId, subcategoryId] = requestData as [string, string];
      response = await deleteCompareSubcategory(categoryId, subcategoryId);
    }

    return response;
  }),
  http.get('/fakeAPI/getCompareProducts/:categoryId/:subcategoryId', async ({ params }) => {
    const { categoryId, subcategoryId } = params;

    const productCards = await getCompareProductCards(categoryId as string, subcategoryId as string);

    return HttpResponse.json<ProductWithIdsAndNames[]>(productCards);
  }),
  http.get('/fakeAPI/news', async ({ request }) => {
    const pageNum = Number(new URL(request.url).searchParams.get('page'));

    const newsPreviews = await getNewsPreviewsPerPageAndPageAmount(pageNum);
    return HttpResponse.json<NewsArticlesWithAmount>(newsPreviews);
  }),
  http.get('/fakeAPI/newsArticle/:articleId', async ({ params }) => {
    const { articleId } = params;

    const newsArticle = await getNewsArticle(articleId as string);

    return HttpResponse.json<NewsArticle>(newsArticle);
  }),
  http.get('/fakeAPI/getRecommendedNews/:articleId', async ({ params }) => {
    const { articleId } = params;

    const recommendedNews = await getRecommendedNews(articleId as string);

    return HttpResponse.json<NewsArticleShort[]>(recommendedNews);
  }),
  http.get('/fakeAPI/getProduct/:categoryId/:subcategoryId/:productId', async ({ params }) => {
    const { categoryId, subcategoryId, productId } = params;

    const product = await getProduct(categoryId as string, subcategoryId as string, productId as string);
    return HttpResponse.json<ProductWithIdsAndNames>(product);
  }),
  http.get('/fakeAPI/getAnalogueProducts/:categoryId/:subcategoryId/:productId', async ({ params }) => {
    const { categoryId, subcategoryId, productId } = params;

    const analogueProducts = await getAnalogueProducts(categoryId as string, subcategoryId as string, productId as string);
    return HttpResponse.json<Product[]>(analogueProducts);
  }),
  http.get('/fakeAPI/getRandomProduct', async () => {
    const randomProduct = await getRandomProduct();

    return HttpResponse.json<ProductWithIds>(randomProduct);
  }),
  http.get('/fakeAPI/search', async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('search') || '';
    const pageNum = Number(searchParams.get('page')) || 1;

    const searchResults = await getSearchResultsPerPageAndPageAmount(searchQuery, pageNum);

    return HttpResponse.json<SearchResults>(searchResults);
  }),
];

export const worker = setupWorker(...handlers);
