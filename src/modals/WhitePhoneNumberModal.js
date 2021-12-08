import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle, MDBSpinner
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {sendMessagePinCode, setPhoneNumber, setPhoneNumberModal} from "../store/slices/modalSlice";
import InputMask from 'react-input-mask';
import '../styles/Basket.scss'

const WhitePhoneNumberModal = () => {

    const dispatch = useDispatch()
    const {phoneNumberModal, phoneNumber, send_message_status} = useSelector(state => state.modal);
    const toggleShow = () => {
        dispatch(setPhoneNumberModal())
    }
    const sendPhoneNumber = () => {
        dispatch(sendMessagePinCode(phoneNumber))
    }
    return (
        <>
            <MDBModal staticBackdrop tabIndex='-1' show={phoneNumberModal} setShow={phoneNumberModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Пишите номер телефона</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className={'text-center'}>
                                Сможете быстро оформлять заказы и использовать бонусы
                                <InputMask onKeyPress={(e) => {
                                    if(e.code === 'Enter') {
                                        sendPhoneNumber()
                                    }
                                }} placeholder={'Введите номер телефона'} onChange={(e) => dispatch(setPhoneNumber({phoneNumber:  e.target.value.replace('+(996)', '0').replace(/\s+/g, '')}))} className={'input_phone'} mask="+(\9\96) 999 999 999" maskChar=" " />
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='warning' onClick={toggleShow}>
                                Отмена
                            </MDBBtn>
                            <MDBBtn
                                disabled={phoneNumber.length !== 10 || send_message_status === 'pending'}
                                onClick={sendPhoneNumber}
                                className={`d-flex justify-content-between gap-2`}
                                color={'danger'}>
                                    <MDBSpinner className={` ${send_message_status === 'pending' ? 'd-block' : 'd-none'}`} size={'sm'}  color='light'/>
                                    Продолжить
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default WhitePhoneNumberModal;
