import { EndpointBuilder, FetchArgs, QueryArgFrom, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import type { CartId, CategoryShort, CompareId, FilteredProductsAndMinMaxPrice, NewsArticlesWithAmount, ProductWithIds, SearchResults, WishlistId } from '../utils/dataAPI';
import { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const categoriesAdapter = createEntityAdapter<CategoryShort>();

const tagTypes = [
  'categories',
  'subcategoryProducts',
  'wishlistIds',
  'wishlistProducts',
  'cartIds',
  'cartProducts',
  'compareIds',
  'compareSubcategories',
  'compareProducts',
  'news',
  'newsArticle',
  'recommendedNews',
  'product',
  'analogueProducts',
  'randomProduct',
  'searchResults',
];

function createPatchDeleteMutation<ArgType>(
  queryFn: (arg?: ArgType) => string | FetchArgs,
  invalidatedTags: ({ type: string, id: string } | string)[],
  updateQueryFn: (arg: ArgType) => void,
) {
  return {
    query: queryFn,
    invalidatesTags: invalidatedTags,
    async onQueryStarted(args: ArgType, { dispatch, queryFulfilled }: any) {
      const patchResult = dispatch(updateQueryFn(args));
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  };
}

export const queryAPI = createApi(
  {
    keepUnusedDataFor: 0,
    reducerPath: 'globalData',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeAPI' }),
    tagTypes,
    endpoints: (builder) => ({
      getCategories: builder.query<EntityState<CategoryShort, string>, void>({
        query: () => '/categories',
        transformResponse(response: CategoryShort[]) {
          return categoriesAdapter.addMany(categoriesAdapter.getInitialState(), response);
        },
        providesTags: ['categories'],
      }),
      getProducts: builder.query<FilteredProductsAndMinMaxPrice, string>({
        query: (partialUrl) => `/getProducts/${partialUrl}`,
        providesTags: ['subcategoryProducts'],
      }),
      getWishlistIds: builder.query<WishlistId[] | [], void>({
        query: () => '/wishlistIds',
        providesTags: [{ type: 'wishlistIds', id: 'LIST' }],
      }),
      addWishlistId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/wishlistIds',
            method: 'POST',
            body,
          }),
          [{ type: 'wishlistIds', id: 'LIST' }, 'wishlistProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft: any) => {
              const parsedBody = JSON.parse(args);
              draft.push(parsedBody);
            })
          ),
        ),
      ),
      deleteWishlistId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/wishlistIds',
            method: 'DELETE',
            body,
          }),
          [{ type: 'wishlistIds', id: 'LIST' }, 'wishlistProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft) => {
              const [categoryId, subcategoryId, productId] = JSON.parse(args);
              const index = draft.findIndex(([draftCaId, draftSId, draftPId]) => (
                draftCaId === categoryId
                && draftSId === subcategoryId
                && draftPId === productId
              ));
              draft.splice(index, 1);
            })
          ),
        ),
      ),
      deleteAllWishlistIds: builder.mutation(
        createPatchDeleteMutation(
          () => ({
            url: '/wishlistIds',
            method: 'DELETE',
            body: JSON.stringify({ deleteAll: true }),
          }),
          [{ type: 'wishlistIds', id: 'LIST' }, 'wishlistProducts'],
          () => (
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft) => {
              draft.splice(0);
            })
          ),
        ),
      ),
      getWishlistProducts: builder.query({
        query: (page) => `/getWishlistProducts?page=${page}`,
        providesTags: ['wishlistProducts'],
      }),
      getCartIds: builder.query<CartId[] | [], void>({
        query: () => '/cartIds',
        providesTags: [{ type: 'cartIds', id: 'LIST' }],
      }),
      addCartId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/cartIds',
            method: 'POST',
            body,
          }),
          [{ type: 'cartIds', id: 'LIST' }, 'cartProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCartIds', undefined, (draft) => {
              const [categoryId, subcategoryId, productId] = JSON.parse(args);
              const cartProductIdObject = {
                categoryId,
                subcategoryId,
                productId,
                amount: 1,
              };

              draft.push(cartProductIdObject);
            })
          ),
        ),
      ),
      editCartIdAmount: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/cartIds',
            method: 'PATCH',
            body,
          }),
          [{ type: 'cartIds', id: 'LIST' }, 'cartProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCartIds', undefined, (draft) => {
              const [categoryId, subcategoryId, productId, amount] = JSON.parse(args);
              const product = draft.find((dObj) => dObj.categoryId === categoryId
                && dObj.subcategoryId === subcategoryId && dObj.productId === productId);

              product.amount = amount;
            })
          ),
        ),
      ),
      deleteCartId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/cartIds',
            method: 'DELETE',
            body,
          }),
          [{ type: 'cartIds', id: 'LIST' }, 'cartProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCartIds', undefined, (draft) => {
              const [categoryId, subcategoryId, productId] = JSON.parse(args);
              const index = draft.findIndex((draftCartIdObj) => (
                draftCartIdObj.categoryId === categoryId
                && draftCartIdObj.subcategoryId === subcategoryId
                && draftCartIdObj.productId === productId
              ));
              draft.splice(index, 1);
            })
          ),
        ),
      ),
      deleteAllCartIds: builder.mutation(
        createPatchDeleteMutation(
          () => ({
            url: '/cartIds',
            method: 'DELETE',
            body: JSON.stringify({ deleteAll: true }),
          }),
          [{ type: 'cartIds', id: 'LIST' }, 'cartProducts'],
          () => (
            queryAPI.util.updateQueryData('getCartIds', undefined, (draft) => {
              draft.splice(0);
            })
          ),
        ),
      ),
      getCartProducts: builder.query({
        query: () => '/getCartProducts',
        providesTags: ['cartProducts'],
      }),
      getCompareIds: builder.query<CompareId[] | [], void>({
        query: () => '/compareIds',
        providesTags: [{ type: 'compareIds', id: 'LIST' }],
      }),
      addCompareId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/compareIds',
            method: 'POST',
            body,
          }),
          [{ type: 'compareIds', id: 'LIST' }, 'compareSubcategories', 'compareProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCompareIds', undefined, (draft) => {
              const parsedBody = JSON.parse(args);
              draft.push(parsedBody);
            })
          ),
        ),
      ),
      deleteCompareId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/compareIds',
            method: 'DELETE',
            body,
          }),
          [{ type: 'compareIds', id: 'LIST' }, 'compareSubcategories', 'compareProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCompareIds', undefined, (draft) => {
              const [categoryId, subcategoryId, productId] = JSON.parse(args);
              const index = draft.findIndex(([draftCaId, draftSId, draftPId]) => (
                draftCaId === categoryId
                && draftSId === subcategoryId
                && draftPId === productId
              ));
              draft.splice(index, 1);
            })
          ),
        ),
      ),
      getCompareSubcategories: builder.query({
        query: () => '/compareSubcategories',
        providesTags: ['compareSubcategories'],
      }),
      deleteCompareSubcategory: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/compareSubcategories',
            method: 'DELETE',
            body,
          }),
          [{ type: 'compareIds', id: 'LIST' }, 'compareSubcategories', 'compareProducts'],
          (args) => (
            queryAPI.util.updateQueryData('getCompareSubcategories', undefined, (draft) => {
              const request = JSON.parse(args);

              if (request.deleteAll) {
                draft.splice(0);
              } else {
                const [categoryId, subcategoryId] = request;
                const index = draft.findIndex((subcObj) => (
                  subcObj.categoryId === categoryId && subcObj.subcategoryId === subcategoryId
                ));
                draft.splice(index, 1);
              }
            })
          ),
        ),
      ),
      getCompareProducts: builder.query({
        query: ({ categoryId, subcategoryId }) => `/getCompareProducts/${categoryId}/${subcategoryId}`,
        providesTags: ['compareProducts'],
      }),
      getNews: builder.query<NewsArticlesWithAmount, number>({
        query: (pageNum) => `/news?page=${pageNum}`,
        providesTags: ['news'],
      }),
      getNewsArticle: builder.query({
        query: (articleId) => `/newsArticle/${articleId}`,
        providesTags: ['newsArticle'],
      }),
      getRecommendedNews: builder.query({
        query: (articleId) => `/getRecommendedNews/${articleId}`,
        providesTags: ['recommendedNews'],
      }),
      getProduct: builder.query({
        query: (partialUrl) => `/getProduct/${partialUrl}`,
        providesTags: ['product'],
      }),
      getAnalogueProducts: builder.query({
        query: (partialUrl) => `/getAnalogueProducts/${partialUrl}`,
        providesTags: ['analogueProducts'],
      }),
      getRandomProduct: builder.query<ProductWithIds, void>({
        query: () => '/getRandomProduct',
        providesTags: ['randomProduct'],
      }),
      getSearchResults: builder.query<SearchResults, { searchQuery: string, pageNum: number }>({
        query: ({ searchQuery, pageNum }) => `/search?search=${searchQuery}&page=${pageNum}`,
        providesTags: ['searchResults'],
      }),
    }),
  },
);

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetWishlistIdsQuery,
  useAddWishlistIdMutation,
  useDeleteWishlistIdMutation,
  useDeleteAllWishlistIdsMutation,
  useGetWishlistProductsQuery,
  useGetCartIdsQuery,
  useAddCartIdMutation,
  useEditCartIdAmountMutation,
  useDeleteCartIdMutation,
  useDeleteAllCartIdsMutation,
  useGetCartProductsQuery,
  useGetCompareIdsQuery,
  useAddCompareIdMutation,
  useDeleteCompareIdMutation,
  useGetCompareSubcategoriesQuery,
  useDeleteCompareSubcategoryMutation,
  useGetCompareProductsQuery,
  useGetNewsQuery,
  useGetNewsArticleQuery,
  useGetRecommendedNewsQuery,
  useGetProductQuery,
  useGetAnalogueProductsQuery,
  useGetRandomProductQuery,
  useGetSearchResultsQuery,
} = queryAPI;
