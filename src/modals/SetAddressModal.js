import React, {useState} from 'react';
import {
    MDBBtn, MDBCol, MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle, MDBRow, MDBTooltip
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {setAddressModal} from "../store/slices/checkoutSlice";
import {setAddress} from "../store/slices/userSlice";


const SetAddressModal = () => {
    const [streetL, setStreetL] = useState('');
    const [flat, setFlat] = useState('');
    const [entrance, setEntrance] = useState('');
    const [door_code, setDoor_code] = useState('');
    const [floor, setFloor] = useState('');
    const [home, setHome] = useState('');
    const [comment, setComment] = useState('');
    const {addressModal} = useSelector(state => state.checkout);
    const dispatch = useDispatch();

    const check = () => streetL.length < 3 || flat.length < 1 || entrance.length < 1 || door_code.length < 1 || floor.length < 1 || home.length < 1;
    const checkout = () => {
        let address = `ул.${streetL}, д.${home}, под.${entrance}, эт.${floor}, кв.${flat}, код.${door_code} \n\n ${comment}`;
        dispatch(setAddress({address}));
        dispatch(setAddressModal());
    }
    const toggleShow = () => {
        dispatch(setAddressModal());
    }
    return (
        <>
            <MDBModal staticBackdrop tabIndex='-1' show={addressModal} setShow={addressModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Куда доставить ?</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow>
                                <MDBCol className={'mt-2'} xs={8} md={8}>
                                    <MDBInput label='Улица' value={streetL}
                                              onChange={(e) => setStreetL(e.target.value)}/>
                                </MDBCol>
                                <MDBCol className={'mt-2'} xs={3} md={3}>
                                    <MDBInput type={'number'} label='Дом' value={home}
                                              onChange={(e) => setHome(e.target.value)}/>
                                </MDBCol>
                            </MDBRow>
                            <div className={'d-flex mt-4 gap-3'}>
                                <MDBInput
                                    value={flat}
                                    onChange={(e) => setFlat(e.target.value)}
                                    type={'number'}
                                    label={'Квартира'}/>
                                <MDBInput
                                    value={entrance}
                                    onChange={(e) => setEntrance(e.target.value)}
                                    type={'number'}
                                    label={'Подъезд'}/>
                                <MDBInput
                                    value={door_code}
                                    onChange={(e) => setDoor_code(e.target.value)}
                                    type={'number'}
                                    label={'Код двери'}/>
                                <MDBInput
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    type={'number'}
                                    label={'Этаж'}/>
                            </div>
                            <MDBInput className={'mt-4'} onChange={(e) => setComment(e.target.value)}
                                      label='Дополнительное информация' value={comment} textarea rows={4}/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBTooltip className={`ml-2 tooltip_ ${check() ? 'd-block' : 'd-none'}`} placement={'left'}
                                        tag='span' title='Пополните все поля'>
                                <MDBBtn
                                    onClick={checkout}
                                    disabled={check()}
                                    color={'danger'}>Подтвердить адресс</MDBBtn>
                            </MDBTooltip>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default SetAddressModal;
