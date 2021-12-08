import React from 'react';
import BasketProductsComponent from "../components/basket/BaketProductsCoponent";
import {MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTooltip} from "mdb-react-ui-kit";
import '../styles/Basket.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPhoneNumberModal} from "../store/slices/modalSlice";
import {useNavigate} from "react-router-dom";

const BasketPage = () => {
    const {allPrice} = useSelector(state => state.basket);
    const {token} = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClick = () => {
       if(token === null || token === 'null') {
           dispatch(setPhoneNumberModal());
       }
       else {
           navigate('/checkout')
       }
    }
    return (
        <div>
            <>
                <MDBContainer style={{marginTop: 80}}>
                    <h5>Мои Заказы</h5>
                    <MDBRow className={'m-0 p-0'}>
                        <MDBCol xs={12} md={8}>
                            <BasketProductsComponent/>
                        </MDBCol>
                        <MDBCol xs={12} md={4}>
                            <div className={'basket_banner d-none d-md-block'}/>
                            <div className={'basket_footer d-flex justify-content-between align-items-center'}>
                                <span >Сумма: {allPrice} сом</span>
                                <MDBTooltip tag='span' placement={'left'} className={allPrice < 350 ? 'd-inline-block ': 'd-none '} wrapperClass={ 'd-inline-block'} title='Обшая сумма заказа должна быть не менее 350сом !'>
                                    <MDBBtn
                                        onClick={handleClick}
                                        disabled={allPrice < 350}
                                        rounded
                                        color={'danger'}>Оформлять заказ</MDBBtn>
                                </MDBTooltip>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        </div>
    );
};

export default BasketPage;
