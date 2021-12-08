import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    active_item: 0,
    items_menu: [
        {title: 'Пицца',icon: 'pizza-slice', category: 'pizza'},
        {title: 'Закуски', icon: 'hamburger', category: 'snacks'},
        {title: 'Комбо', icon: 'stroopwafel', category:'combo'},
        {title: 'Напитки', icon: 'cocktail', category:'drinks'},
    ]
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveItem (state, action) {
            state.active_item = action.payload.index;
        }
    }
})
export default  menuSlice.reducer;

export const {setActiveItem} = menuSlice.actions