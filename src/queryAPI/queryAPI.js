import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();
const newsAdapter = createEntityAdapter();

const tagTypes = [
  'categories',
  'news',
  'subcategoryProducts',
  'wishlistIds',
  'cartIds',
  'compareIds',
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
        query: () => '/news',
        transformResponse(response) {
          return newsAdapter.addMany(newsAdapter.getInitialState(), response);
        },
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
            method: 'PATCH',
            body,
          }),
          [{ type: 'wishlistIds', id: 'LIST' }],
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
          [{ type: 'wishlistIds', id: 'LIST' }],
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
      getCartIds: builder.query({
        query: () => '/cartIds',
        providesTags: [{ type: 'cartIds', id: 'LIST' }],
      }),
      addCartId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/cartIds',
            method: 'PATCH',
            body,
          }),
          [{ type: 'cartIds', id: 'LIST' }],
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
      deleteCartId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/cartIds',
            method: 'DELETE',
            body,
          }),
          [{ type: 'cartIds', id: 'LIST' }],
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
      getCompareIds: builder.query({
        query: () => '/compareIds',
        providesTags: [{ type: 'compareIds', id: 'LIST' }],
      }),
      addCompareId: builder.mutation(
        createPatchDeleteMutation(
          (body) => ({
            url: '/compareIds',
            method: 'PATCH',
            body,
          }),
          [{ type: 'compareIds', id: 'LIST' }],
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
          [{ type: 'compareIds', id: 'LIST' }],
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
  useGetCartIdsQuery,
  useAddCartIdMutation,
  useDeleteCartIdMutation,
  useGetCompareIdsQuery,
  useAddCompareIdMutation,
  useDeleteCompareIdMutation,
} = queryAPI;
