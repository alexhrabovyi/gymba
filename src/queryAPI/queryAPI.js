import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();
const newsAdapter = createEntityAdapter();

export const queryAPI = createApi(
  {
    reducerPath: 'globalData',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeAPI' }),
    tagTypes: ['categories', 'news', 'subcategoryProducts', 'wishlistIds'],
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
      addWishlistId: builder.mutation({
        query: (body) => ({
          url: '/wishlistIds',
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [{ type: 'wishlistIds', id: 'LIST' }],
        async onQueryStarted(body, { dispatch, queryFulfilled }) {
          const parsedBody = JSON.parse(body);

          const patchResult = dispatch(
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft) => {
              draft.push(parsedBody);
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
      deleteWishlistId: builder.mutation({
        query: (body) => ({
          url: '/wishlistIds',
          method: 'DELETE',
          body,
        }),
        invalidatesTags: [{ type: 'wishlistIds', id: 'LIST' }],
        async onQueryStarted(body, { dispatch, queryFulfilled }) {
          const [categoryId, subcategoryId, productId] = JSON.parse(body);

          const patchResult = dispatch(
            queryAPI.util.updateQueryData('getWishlistIds', undefined, (draft) => {
              const index = draft.findIndex(([draftCaId, draftSId, draftPId]) => (
                draftCaId === categoryId
                && draftSId === subcategoryId
                && draftPId === productId
              ));

              draft.splice(index, 1);
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
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
} = queryAPI;
