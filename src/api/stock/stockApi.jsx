import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const stockApi = createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Stock'],
    endpoints: (builder) => ({
        getStock: builder.query({
            query: () => 'api/v1/stock',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Stock', id })),
                        { type: 'Stock', id: 'LIST' },
                    ] :
                    [{ type: 'Stock', id: 'LIST' },]
        }),
    }),
})

export const {
    useGetStockQuery,
} = stockApi;