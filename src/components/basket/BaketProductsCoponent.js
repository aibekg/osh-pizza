import React from 'react';
import '../../styles/Basket.scss'
import {useSelector} from "react-redux";
import BasketCardComponent from "./BasketCardComponent";
import '../../styles/Basket.scss'

const BasketProductsComponent = () => {
    const {basket} = useSelector(state => state.basket)
    if(basket[0]){
        return (
            <div className={'my-3 basket_container'} >
                {
                    basket.map((item, index) => <BasketCardComponent key={index} index={index} item={item}/>)
                }
            </div>
        )
    }else{
        return (
            <div className={'cart_empty_div'}>
                <div className={'cart_empty_title'}>Ой, пусто!</div>
            </div>
        )
    }
};

export default BasketProductsComponent;
