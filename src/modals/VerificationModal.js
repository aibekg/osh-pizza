import React, {useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {setPinCodeModal} from "../store/slices/modalSlice";
import '../styles/Basket.scss';
import http from '../settings/http-common'
import {errorMessage, successMessage} from "../utilis/messages";
import {useNavigate} from "react-router-dom";
import {getUser, setUserToken} from "../store/slices/userSlice";

const VerificationModal = () => {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const {pinCodeModal, hashCode, phoneNumber} = useSelector(state => state.modal);
    const {token} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const toggleShow = () => {
        dispatch(setPinCodeModal())
    }
    const handleChange = (element, index) => {
        if(isNaN(element.value)) return false
        setOtp(p => [...p.map((d, i) => (i === index) ? element.value: d )]);
        if(element.nextSibling && element.value !== '') element.nextSibling.focus();
    }

    const addUserForPhoneNumber = () => {
        http.post(  '/auth/add_user_for_phone_number', {
            phone_number : phoneNumber
        })
            .then(({data}) => {
                if(data.status === 'success'){
                    dispatch(getUser(token))
                }
            })
    }

    const verificationCode = () => {
        const a = http.post( '/auth/verification_code', {
            hashCode,
            pinCode: otp.join(''),
            phone_number: phoneNumber
        })
        a.then(({data}) => {
            if(data.status === 'matches') {
                successMessage('Код совпадает');
                addUserForPhoneNumber();
                dispatch(setUserToken({token: data.token}));
                dispatch(setPinCodeModal());
                navigate('/checkout');
            }else {
                errorMessage('Код не собвпадает')
            }
        })
    }

    return (
        <>
            <MDBModal staticBackdrop tabIndex='-1' show={pinCodeModal} setShow={pinCodeModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Код подтверждение</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className={'d-flex justify-content-center'}>
                                {
                                    otp.map((item, index) => {
                                        return (
                                            <input
                                                className={'pin-field'}
                                                name={'otp'}
                                                maxLength={'1'}
                                                key={index}
                                                type="text"
                                                value={item}
                                                onChange={e => handleChange(e.target, index) }
                                                onFocus={e => e.target.select()}
                                            />
                                        )})}
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                color={'danger'}
                                disabled={otp.join('').length !== 4}
                                onClick={verificationCode}
                            >Подтвердить</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default VerificationModal;
