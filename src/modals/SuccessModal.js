import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {setSuccessModal} from "../store/slices/modalSlice";

const SuccessModal = () => {
    const dispatch = useDispatch();
    const {successModal} = useSelector(state => state.modal)

    const toggleShow = () => {
        dispatch(setSuccessModal());
    }
    return (
        <div>
            <MDBModal staticBackdrop tabIndex='-1' show={successModal} setShow={successModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}/>
                        </MDBModalHeader>
                        <MDBModalBody>...</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Understood</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default SuccessModal;
