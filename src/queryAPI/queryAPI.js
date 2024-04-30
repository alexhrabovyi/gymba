import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriesAdapter = createEntityAdapter();

export const queryAPI = createApi(
  {
    reducerPath: 'globalData',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeAPI' }),
    tagTypes: ['categories'],
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => '/categories',
        transformResponse(response) {
          return categoriesAdapter.addMany(categoriesAdapter.getInitialState(), response);
        },
        providesTags: ['categories'],
      }),
    }),
  },
);

export const { useGetCategoriesQuery } = queryAPI;
