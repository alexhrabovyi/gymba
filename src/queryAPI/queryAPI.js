/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();

const tagTypes = [
  'categories',
  'news',
  'subcategoryProducts',
  'wishlistIds',
  'wishlistProducts',
  'cartIds',
  'cartProducts',
  'compareIds',
  'compareSubcategories',
  'compareProducts',
  'product',
  'analogueProducts',
];

function createPatchDeleteMutation(queryFn, invalidatedTags, updateQueryFn) {
  return {
    query: queryFn,
    invalidatesTags: invalidatedTags,
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
      getCategories: builder.query({
        query: () => '/categories',
        transformResponse(response) {
          return categoriesAdapter.addMany(categoriesAdapter.getInitialState(), response);
        },
        providesTags: ['categories'],
      }),
      getNews: builder.query({
        query: (pageNum) => (pageNum ? `/news?page=${pageNum}` : '/news'),
        providesTags: ['news'],
      }),
      getProducts: builder.query({
        query: (partialUrl) => `/getProducts/${partialUrl}`,
        providesTags: ['subcategoryProducts'],
      }),
      getWishlistIds: builder.query({
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
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft) => {
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
      getCartIds: builder.query({
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
      getCompareIds: builder.query({
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
      getProduct: builder.query({
        query: (partialUrl) => `/getProduct/${partialUrl}`,
        providesTags: ['product'],
      }),
      getAnalogueProducts: builder.query({
        query: (partialUrl) => `/getAnalogueProducts/${partialUrl}`,
        providesTags: ['analogueProducts'],
      }),
    }),
  },
);

export const {
  useGetCategoriesQuery,
  useGetNewsQuery,
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
  useGetProductQuery,
  useGetAnalogueProductsQuery,
} = queryAPI;
