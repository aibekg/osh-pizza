import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import productReducer from './slices/productSlice';
import basketReducer from './slices/basketSlice';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import checkoutReducer from './slices/checkoutSlice';
import stockReducer from './slices/stockSlice';
import favoriteReducer from './slices/favoriteSlice';

export default configureStore({
     reducer: {
          menu: menuReducer,
          product: productReducer,
          basket: basketReducer,
          modal: modalReducer,
          user: userReducer,
          checkout: checkoutReducer,
          stock: stockReducer,
          favorite: favoriteReducer
     }
})