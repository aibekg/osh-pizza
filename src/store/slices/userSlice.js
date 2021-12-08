import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from '../../settings/http-common'

export const getUser = createAsyncThunk(
    'user/getUser',
    async (token) => {
            const {data} = await http.get('/auth/get_user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data;
    }
)

const initialState = {
    user: JSON.parse(localStorage.getItem('user_')) || null,
    token: localStorage.getItem('token_') || null,
    address: '',
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken (state, {payload}) {
            state.token= payload.token;
        },
        removeUserToken (state) {
            state.user = null;
            state.token = null;
            localStorage.setItem('token_', null);
            localStorage.setItem('user_', null)
        },
        setAddress(state, {payload}) {
            state.address = payload.address
        }
    },
    extraReducers: {
        [getUser.fulfilled] (state, {payload}) {
            if(payload.status === 'success'){
                state.user = payload.user;
            }
        }
    }
})
export default userSlice.reducer;
export const {setUserToken, removeUserToken, setAddress} = userSlice.actions