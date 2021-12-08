import {createSlice} from "@reduxjs/toolkit";
import useCheck from "../../hooks/useCheck";


const initialState ={
    basket: JSON.parse(localStorage.getItem('osh_pizza_basket')) || [],
    allPrice: localStorage.getItem('osh_pizza_basket_all_price') || 0
}
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        SetBasket(state, action) {
            const product = action.payload.product;
            if(useCheck(state.basket, product)){
                state.basket = state.basket.filter(item => item.id !== product.id && product.id !== item.id);
                state.allPrice = state.basket[0] ?  state.basket.map(item => item.price * item.piece).reduce((a, b ) => a + b): 0
            }else{
                state.basket.push(product);
                state.allPrice = state.basket.map(item => item.price * item.piece).reduce((a, b ) => a + b)
            }
        },
        changePieceProduct (state, {payload}) {
            const setAllPrice = () => {
                state.allPrice = state.basket[0] ?  state.basket.map(item => item.price * item.piece).reduce((a, b ) => a + b): 0
            }
            if(payload.status ===  'increment'){
                state.basket[payload.index].piece = ++state.basket[payload.index].piece;
                state.allPrice = state.basket.map(item => item.price).reduce((a, b ) => a + b)
                setAllPrice()
            }else{
                if(state.basket[payload.index].piece <= 1){
                    state.basket = state.basket.filter(item => item.id !== payload.product.id && payload.product.id !== item.id);
                    setAllPrice()
                }else{
                    state.basket[payload.index].piece = --state.basket[payload.index].piece;
                    setAllPrice()
                }
            }
        },
        clearBasket (state) {
            state.basket = [];
            state.allPrice = 0;
        }
    }
})
export default basketSlice.reducer;

export const {SetBasket, changePieceProduct, clearBasket} = basketSlice.actions;