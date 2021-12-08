import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites_')) || [],
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorite (state, action) {
            const product = action.payload.product;
            if(state.favorites.filter(item => item.id === product.id && item.title === product.title).length){
                state.favorites = state.favorites.filter(item => item.id !== product.id && product.id !== item.id);
            }else{
                state.favorites.push(product);
            }
        }
    }
});

export default favoriteSlice.reducer;
export const {setFavorite} = favoriteSlice.actions;