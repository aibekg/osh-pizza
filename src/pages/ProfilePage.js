import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {removeUserToken} from "../store/slices/userSlice";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const {user} = useSelector(state => state.user);
    const [name, setName] = useState( user.name || '');
    const navigate = useNavigate();
    const [change, ] = useState(true);
    const dispatch = useDispatch();

    const logOff = () => {
      dispatch(removeUserToken());
      navigate('/')
    }
    return (
        <>
            <MDBContainer style={{marginTop: 80, marginBottom: 100}}>
                <h5>Личный профиль</h5>
                <MDBRow className={' gap-2 mt-5'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>Имя</MDBCol>
                    <MDBCol md={4} xs={12}>
                        <MDBInput
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            disabled={change}
                            label='Имя'/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol className={'text-start text-md-end'} md={2} xs={12}>Номер телефона</MDBCol>
                    <MDBCol md={4} xs={12}>
                        <MDBInput
                            disabled={true}
                            value={user!== null ? user.phone_number: ''}
                            label='Номер телефона'/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={' gap-2 mt-3'}>
                    <MDBCol xs={12} md={6}>
                        <div className={'d-flex justify-content-end mt-4'}>
                            <MDBBtn
                                onClick={logOff}
                                color={'danger'}>Выйти</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default ProfilePage;
