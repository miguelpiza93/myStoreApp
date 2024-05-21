import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Supplier'],
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: () => 'api/v1/suppliers',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Supplier', id })),
                        { type: 'Supplier', id: 'LIST' },
                    ] :
                    [{ type: 'Supplier', id: 'LIST' },]
        }),
        addSupplier: builder.mutation({
            query: (body) => ({
                url: 'api/v1/suppliers',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Supplier', id: 'LIST' }]
        }),
        addProductToSupplier: builder.mutation({
            query: (body) => ({
                url: 'api/v1/supplier-products',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { supplierId }) => [{ type: 'Supplier', id: supplierId }],
        }),
    }),
})

export const {
    useGetSuppliersQuery,
    useAddSupplierMutation,
    useAddProductToSupplierMutation
} = supplierApi;