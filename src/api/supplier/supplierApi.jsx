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
        getSupplier: builder.query({
            query: (id) => `api/v1/suppliers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Supplier', id }],
        }),
        getSupplierProducts: builder.query({
            query: (id) => `api/v1/suppliers/${id}/products`,
            providesTags: (result, error, id) => [{ type: 'Supplier', id }],
        }),
        getSupplierProduct: builder.query({
            query: ({vendorId, productId, ...args}) => `api/v1/suppliers/${vendorId}/products/${productId}`
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
            query: ({id, body}) => ({
                url: `api/v1/suppliers/${id}/link-products`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { supplierId }) => [{ type: 'Supplier', id: supplierId }],
        }),
        updateSupplier: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `api/v1/suppliers/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    supplierApi.util.updateQueryData('getSupplier', id, (draft) => {
                        Object.assign(draft, patch)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Supplier', id }],
        }),
        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `api/v1/suppliers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Supplier', id }],
        }),
    }),
})

export const {
    useGetSuppliersQuery,
    useGetSupplierQuery,
    useGetSupplierProductsQuery,
    useGetSupplierProductQuery,
    useAddSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
    useAddProductToSupplierMutation
} = supplierApi;