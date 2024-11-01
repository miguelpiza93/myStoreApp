import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'api/v1/products',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Product', id })),
                        { type: 'Product', id: 'LIST' },
                    ] :
                    [{ type: 'Product', id: 'LIST' },]
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: 'api/v1/products',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }]
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `api/v1/products/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        setSalePrice: builder.mutation({
            query: ({ productId, vendorId, ...body }) => ({
                url: `api/v1/products/${productId}/vendors/${vendorId}/prices`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, data) => [{ type: 'Product', id: data.productId }],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useSetSalePriceMutation,
} = productApi;