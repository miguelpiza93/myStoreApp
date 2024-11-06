import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config'

export const unitApi = createApi({
    reducerPath: 'unitApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl }),
    tagTypes: ['Unit'],
    endpoints: (builder) => ({
        getUnits: builder.query({
            query: () => 'api/v1/units',
            providesTags: (result) =>
                result ?
                    [
                        ...result.map(({ id }) => ({ type: 'Unit', id })),
                        { type: 'Unit', id: 'LIST' },
                    ] :
                    [{ type: 'Unit', id: 'LIST' },]
        }),
        addUnit: builder.mutation({
            query: (body) => ({
                url: 'api/v1/units',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Unit', id: 'LIST' }]
        }),
    }),
})

export const {
    useGetUnitsQuery,
    useAddUnitMutation,
} = unitApi;