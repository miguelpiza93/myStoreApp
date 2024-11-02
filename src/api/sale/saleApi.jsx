import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Sale'],
    endpoints: (builder) => ({
        addSale: builder.mutation({
            query: (body) => ({
                url: 'api/v1/sales',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Sale', id: 'LIST' }]
        }),
        getSales: builder.query({
            query: () => 'api/v1/sales',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Sale', id })),
                        { type: 'Sale', id: 'LIST' },
                    ] :
                    [{ type: 'Sale', id: 'LIST' },]
        }),
    }),
})

export const {
    useAddSaleMutation,
    useGetSalesQuery,
} = saleApi;