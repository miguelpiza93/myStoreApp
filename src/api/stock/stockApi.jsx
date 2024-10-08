import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const stockApi = createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Stock'],
    endpoints: (builder) => ({
        getStockSummary: builder.query({
            query: () => 'api/v1/stock/summary',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Stock', id })),
                        { type: 'Stock', id: 'LIST' },
                    ] :
                    [{ type: 'Stock', id: 'LIST' },]
        }),
        setSalePrice: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `api/v1/stock/products/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Stock', id: 'LIST' }]
        }),
    }),
})

export const {
    useGetStockSummaryQuery,
    useSetSalePriceMutation,
} = stockApi;