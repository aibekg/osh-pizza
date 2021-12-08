import React from 'react';
import {MDBCard, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import {HOST} from "../../settings/config";
import {useDispatch} from "react-redux";
import {changePieceProduct} from "../../store/slices/basketSlice";

const BasketCardComponent = ({item, index}) => {
    const dispatch = useDispatch()

    const increment = () => {
        dispatch(changePieceProduct({
            index,
            status: 'increment',
            product: item
        }))
    }
    const decrement = () => {
        dispatch(changePieceProduct({
            index,
            status: 'decrement',
            product: item
        }))
    }
    return (
        <div>
            <MDBCard className={'basket_card'}>
                <div className={'basket_card_img'} style={{backgroundImage: `url(${HOST + '/uploads/'+ item.img_url})`}} />
                        <MDBCardBody>
                            <MDBCardTitle className={'basket_card_title'}>{item.title}</MDBCardTitle>
                            <div className={'basket_card_description'}>
                                {item.description}
                            </div>
                            <div className={'basket_card_price'}>
                                {
                                    item.price * item.piece
                                } сом
                            </div>
                            <div className={'basket_control_count'}>
                                <span onClick={decrement}>-</span>
                                <span>{item.piece}</span>
                                <span onClick={increment}>+</span>
                            </div>
                        </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default BasketCardComponent;
