import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    addressModal: false
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setAddressModal (state) {
            state.addressModal = !state.addressModal;
        },
        setAddress (state, {payload}) {
            state.address = payload.address;
            state.addressModal = false;
        }
    },
    extraReducers: {

    }
});

export default checkoutSlice.reducer;
export const {setAddressModal, setAddress} = checkoutSlice.actions