import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import StockPage from "./pages/StockPage";
import CheckoutPage from "./pages/CheckoutPage";
import BasketPage from "./pages/BasketPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import './styles/App.scss'
import NavbarComponent from "./components/home/NavbarComponent";
import {useDispatch, useSelector} from "react-redux";
import FooterComponent from "./components/home/FooterComponent";
import {getUser} from "./store/slices/userSlice";
import {ToastContainer} from "react-toastify";
import VerificationModal from "./modals/VerificationModal";
import WhitePhoneNumberModal from "./modals/WhitePhoneNumberModal";
import SuccessModal from "./modals/SuccessModal";
import SelectPizzaModal from './modals/SelectPizzaModal'
import FavoritePage from "./pages/FavoritePage";

const App = () => {
    const {basket, allPrice} = useSelector(state => state.basket);
    const {token, user} = useSelector(state => state.user);
    const {favorites} = useSelector(state => state.favorite);
    const dispatch = useDispatch();

    useEffect(() => {
                if(token !== null || token !== 'null'){
                    dispatch(getUser(token));
                    localStorage.setItem('token_', token);
                }
    }, [token]);
    useEffect(() => {
        if(user !== null) {
            localStorage.setItem('user_', JSON.stringify(user))
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('osh_pizza_basket', JSON.stringify(basket));
        localStorage.setItem('osh_pizza_basket_all_price', allPrice)
    }, [basket]);

    useEffect(() => {
        localStorage.setItem('favorites_', JSON.stringify(favorites));
    }, [favorites])

    return (
        <>
        <NavbarComponent/>
          <Routes>
              <Route path={'/stocks'} element={<StockPage/>} />
              <Route path={'/checkout'} element={<CheckoutPage/>} />
              <Route path={'/favorites'} element={<FavoritePage/>} />
              <Route path={'/cart'} element={<BasketPage/>} />
              <Route path={'/profile'} element={<ProfilePage/>} />
              <Route path={'/'} element={<HomePage/>} />
          </Routes>
        <FooterComponent/>
            <ToastContainer/>
            <VerificationModal/>
            <WhitePhoneNumberModal/>
            <SuccessModal/>
            <SelectPizzaModal/>
        </>
    );
};

export default App;
