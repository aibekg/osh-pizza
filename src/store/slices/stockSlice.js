import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from '../../settings/http-common'

export const getStocks = createAsyncThunk(
    'stock/getStocks',
    async () => {
        const {data} = await http.get('/stock/get_stocks');
        return data;
    }
)

const initialState = {
    stocks: [],
    status: null,
}

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {},
    extraReducers: {
        [getStocks.pending](state) {
            state.status = 'pending';
        },
        [getStocks.fulfilled](state, {payload}) {
            if(payload.status === 'success'){
                state.stocks = payload.stocks;
            }
        }
    }
});
export default stockSlice.reducer;
export const {} = stockSlice.actions;