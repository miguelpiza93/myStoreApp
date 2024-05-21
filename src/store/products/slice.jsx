// import { createSlice } from "@reduxjs/toolkit";

// export const productsSlice = createSlice({
//     name: 'products',
//     initialState: [],
//     reducers: {
//         addNewProduct: (state, action) => {
//             return [...state, action.payload];
//         },
//         deleteProductById: (state, action) => {
//             const id = action.payload;
//             return state.filter(product => product.id !== id);
//         },
//     }
// });

// export default productsSlice.reducer;
// export const { deleteProductById, addNewProduct, resetProducts } = productsSlice.actions;