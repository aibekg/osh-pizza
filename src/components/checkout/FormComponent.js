import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTooltip} from "mdb-react-ui-kit";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import '../../styles/Checkout.scss'
import {setAddressModal} from "../../store/slices/checkoutSlice";
import axios from "axios";
import {successMessage} from "../../utilis/messages";
import {useNavigate} from "react-router-dom";
import {clearBasket} from "../../store/slices/basketSlice";
import http from '../../settings/http-common'
import {getUser} from "../../store/slices/userSlice";

const FormComponent = () => {
    const dispatch = useDispatch();
    const [time, setTime] = useState('Побыстрее');
    const {user, token} = useSelector(state => state.user)
    const [name, setName] = useState( '');
    const {address} = useSelector(state => state.user);
    const {allPrice, basket} = useSelector(state => state.basket);
    const navigate = useNavigate();
    useEffect(() => {
        if(user !== null){
            setName( user.name === null ? '' : user.name)
        }
    }, []);


    const checked = () => {
        let text = `<b>Заказ:</b> \n\n <b>Имя: </b>${name}.\n <b>Контакт: </b>${user.phone_number}.\n\n <b>Адресс:</b> \n <i>${address}</i> \n <b>Срок поставки:</b> ${time === ''? 'Побыстрее': time}.  \n\n <b>Еды:</b> \n\n ${basket.map((item, index) => '<b>' + (index +1) + '</b>' + '. <i>Название:</i>' + item.title + '.\n' + '\t\t<i>Штук:</i>' + item.piece + '\n' + (item.additives === null ? '':'<b>Добавки: </b>' + item.additives.join(', ') )+ '\n').join(' ')} \n\n <b>Общая сумма заказа: </b>${allPrice} сом\n`;
        http.post( 'auth/add_user', {
            name: name,
            phone_number:  user.phone_number,
            address,
            ordered: user.ordered + 1 ,
            price_of_all_orders: user.price_of_all_orders + allPrice
        })
        axios.get('https://api.telegram.org/bot2131975594:AAEkhVFY7jp1lhcMDUz18mlUm4EmOBZksG4/sendMessage?', {
            params: {
                parse_mode: 'HTML',
                text,
                chat_id: '@osh_pizza',
            },
        }).then(({data}) => {
                if(data.ok){
                    successMessage('Заказ успешно принять !');
                    navigate('/');
                    dispatch(clearBasket());
                    dispatch(getUser(token));
                }
            })
    }

    return (
        <>
            <MDBContainer style={{marginTop: 80, marginBottom: 50}}>
                <h5>Заказ на доставку</h5>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>Имя</MDBCol>
                    <MDBCol md={4} xs={12}>
                        <MDBInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label='Имя'/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>
                        Номер телефона
                    </MDBCol>
                    <MDBCol md={4} xs={12}>
                        <MDBInput label='Номер телефона' value={user !== null ? user.phone_number : ''} disabled/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>
                        Адресс доставки
                    </MDBCol>
                    <MDBCol md={4} xs={12}>
                        <div className={'text_area_block'}>
                            <MDBInput
                                disabled={true}
                                label='Адресс'
                                value={address}
                                textarea rows={4}/>
                            <MDBBtn
                                onClick={() => dispatch(setAddressModal())}
                                className={'text_area_btn'}
                                size={'sm'}>Изменить</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>
                        Время доставки
                    </MDBCol>
                    <MDBCol md={4} xs={12}>
                        <TimePicker
                            placeholder={'Побыстрее'}
                            minuteStep={5}
                            format={'HH:mm'}
                            showSecond={false}
                            onChange={(e) => setTime(moment(e._d).format('HH:mm'))}/>
                    </MDBCol>
                </MDBRow>
                <div  className={'d-flex justify-content-end'}>
                        <MDBTooltip className={address === '' ? 'd-block' : 'd-none'} placement={'left'} tag={'span'} title={'Укажите аддрес'}>
                            <MDBBtn
                                onClick={checked}
                                disabled={address === ''}
                                rounded
                                color={'danger'}
                                className={'mt-3'}
                            >Оформить заказ на {allPrice} сом</MDBBtn>
                        </MDBTooltip>
                </div>
            </MDBContainer>
        </>
    );
};

export default FormComponent;
