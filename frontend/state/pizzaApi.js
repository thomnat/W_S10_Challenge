import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/pizza/" }),
  tagTypes: ['Pizzas'],
  endpoints: builder => ({
    getOrders: builder.query({
      query: () => 'history',
      providesTags: ['Pizzas'],
    }),
    newOrder: builder.mutation({
      query: order => ({
        url: "order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ['Pizzas'],
    })
  })
})

export const {
  useGetOrdersQuery, useNewOrderMutation,
} = pizzaApi