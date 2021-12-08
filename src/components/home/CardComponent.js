import React from 'react';
import {HOST} from "../../settings/config";
import {MDBIcon} from "mdb-react-ui-kit";
import {SetBasket} from "../../store/slices/basketSlice";
import {useDispatch, useSelector} from "react-redux";
import useCheck from "../../hooks/useCheck";
import { setSelectPizzaModal} from "../../store/slices/modalSlice";
import {setFavorite} from "../../store/slices/favoriteSlice";

const CardComponent = ({item, index}) => {
    const {items_menu, active_item} = useSelector(state => state.menu);
    const {basket} = useSelector(state => state.basket);
    const {favorites} = useSelector(state => state.favorite);
    const dispatch = useDispatch();
    const check = useCheck(basket, item);

    const define = () => {
        if(items_menu[active_item].category === 'pizza' && !check){
            dispatch(setSelectPizzaModal({pizza: item}));
        }else{
            dispatch(SetBasket({product: {
                id: item.id,
                title: item.title,
                description: items_menu[active_item].category === 'combo'|| items_menu[active_item].category === 'snacks' ? '1шт' : item.volume + 'литр',
                img_url: item.img_url,
                price: item.discount === null ? item.price : item.price- item.price * item.discount / 100,
                additives: null,
                piece: 1
            }}))
        }
    }
    const setFav = () => {
        dispatch(setFavorite({product: item}))
    }

    const favorite = favorites.filter(data => data.id === item.id && item.title === data.title).length;

    return (
        <>
            <div key={index} className={'menu_card'}>
                <div className="menu_card_img" style={{backgroundImage: `url(${HOST + '/uploads/' +  item.img_url})`}}/>
                <div onClick={setFav} className={'menu_card_favorite_icon'}>
                    {
                        favorite ? <MDBIcon style={{color: '#ff0000'}} fas icon="heart" /> : <MDBIcon far icon="heart" />
                    }
                </div>
                <div className={'menu_card_title'}>{item.title}</div>
                <div className={'menu_card_description'}>
                    {
                        items_menu[active_item].category === 'combo' ||  items_menu[active_item].category === 'snacks' ? item.description :
                        items_menu[active_item].category === 'pizza' &&  item.compositions ?  item.compositions.join(', ') :
                        item.volume+ 'л'
                    }
                </div>
                <div className={'menu_card_discount'}>
                    {
                        item.discount ? Object.keys(item.price).length ?
                        item.price.standard - item.price.standard * item.discount /100 :
                        item.price- item.price * item.discount / 100: ''
                    }
                </div>
                <div className={'menu_card_price'}>
                    <span
                        style={{textDecoration:item.discount ? 'line-through': ''}}>
                            {Object.keys(item.price).length ? item.price.standard : item.price}
                    </span>сом
                </div>
                <div
                    style={{backgroundColor: check ? '#ff0000': '#ff6600'}}
                    onClick={define}
                    className={'menu_card_basket_icon'}>
                        <MDBIcon fas icon={ check ? 'trash' : 'shopping-cart'} />
                </div>
            </div>
        </>
    );
};

export default CardComponent;
