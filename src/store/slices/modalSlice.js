import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from  '../../settings/http-common'
import {errorMessage, successMessage} from "../../utilis/messages";


export const sendMessagePinCode = createAsyncThunk(
    'modal/SendMessagePin',
    async (phoneNumber) => {
        const {data} = await http.post('/auth/phone_number', {
            phone_number : '996' + phoneNumber.substr(1, )
        })
        console.log(phoneNumber)
        return data
    }
)

const initialState = {
    selectPizza: false,
    pizza: null,
    additives: [],
    phoneNumberModal: false,
    pinCodeModal: false,
    hashCode: null,
    send_message_status: null,
    phoneNumber: '',
    successModal: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setSelectPizzaModal (state, {payload}) {
            state.selectPizza = !state.selectPizza;
            state.pizza = payload.pizza;
        },
        setPinCodeModal (state) {
            state.pinCodeModal = !state.pinCodeModal;
        },
        setPhoneNumberModal (state) {
            state.phoneNumberModal = !state.phoneNumberModal;
        },
        setPhoneNumber (state, {payload}) {
            state.phoneNumber = payload.phoneNumber
        },
        setSuccessModal (state) {
            state.successModal = !state.successModal
        }
    },
    extraReducers: {
        [sendMessagePinCode.pending] (state) {
            state.send_message_status = 'pending'
        },
        [sendMessagePinCode.fulfilled] (state, {payload}) {
            console.log(payload);
            if(payload.status === 'success') {
                state.send_message_status = 'fulfilled';
                state.hashCode = payload.hashCode;
                state.phoneNumberModal = false;
                state.pinCodeModal = true;
                successMessage('Код успешно отправлен !')
            }else{
                errorMessage('Нет такого номера телефона !')
            }
        }
    }
})

export default modalSlice.reducer;
export const {setSelectPizzaModal, setPinCodeModal, setPhoneNumberModal, setPhoneNumber, setSuccessModal} = modalSlice.actions;