import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import http from '../../settings/http-common'

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (category) => {
        console.log(category)
        const {data} = await http.get('/get_products', {
            params: {
                category
            }
        })
        return data
    }
)

const initialState = {
    products: [],
    loading: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending] (state) {
            state.loading = 'pending'
        },
        [getProducts.fulfilled] (state, {payload}) {
            state.loading = 'fulfilled';
            state.products = payload.products
        },
        [getProducts.rejected] (state) {
            state.loading = 'rejected'
        }
    }
});

export default productSlice.reducer;
export const {} = productSlice.actions