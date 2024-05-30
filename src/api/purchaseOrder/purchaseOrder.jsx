import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const purchaseOrderApi = createApi({
    reducerPath: 'purchaseOrderApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['PurchaseOrder'],
    endpoints: (builder) => ({
        getpurchaseOrders: builder.query({
            query: () => 'api/v1/purchase-orders',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'PurchaseOrder', id })),
                        { type: 'PurchaseOrder', id: 'LIST' },
                    ] :
                    [{ type: 'PurchaseOrder', id: 'LIST' },]
        }),
        getPurchaseOrder: builder.query({
            query: (id) => `api/v1/purchase-orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'PurchaseOrder', id }],
        }),
        addPurchaseOrder: builder.mutation({
            query: (body) => ({
                url: 'api/v1/purchase-orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'PurchaseOrder', id: 'LIST' }]
        }),
        updatePurchaseOrder: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `api/v1/purchase-orders/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    purchaseOrderApi.util.updateQueryData('getPurchaseOrder', id, (draft) => {
                        Object.assign(draft, patch)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'PurchaseOrder', id }],
        }),
        deletePurchaseOrder: builder.mutation({
            query: (id) => ({
                url: `api/v1/purchase-orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'PurchaseOrder', id }],
        }),
    }),
})

export const {
    useGetpurchaseOrdersQuery,
    useGetPurchaseOrderQuery,
    useAddPurchaseOrderMutation,
    useUpdatePurchaseOrderMutation,
    useDeletePurchaseOrderMutation
} = purchaseOrderApi;