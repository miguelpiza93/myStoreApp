import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['sale'],
    endpoints: (builder) => ({
        addSale: builder.mutation({
            query: (body) => ({
                url: 'api/v1/sales',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'sale', id: 'LIST' }]
        }),
    }),
})

export const {
    useAddSaleMutation,
} = saleApi;