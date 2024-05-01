import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();
const newsAdapter = createEntityAdapter();

export const queryAPI = createApi(
  {
    reducerPath: 'globalData',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeAPI' }),
    tagTypes: ['categories', 'news', 'subcategoryProducts'],
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
    }),
  },
);

export const {
  useGetCategoriesQuery,
  useGetNewsQuery,
  useGetProductsQuery,
} = queryAPI;
