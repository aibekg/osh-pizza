import React from 'react';
import FormComponent from "../components/checkout/FormComponent";
import SetAddressModal from "../modals/SetAddressModal";

const CheckoutPage = () => {
    return (
        <>
            <FormComponent/>
            <SetAddressModal/>
        </>
    );
};

export default CheckoutPage;
