import React from 'react';
import {MDBBadge, MDBIcon} from "mdb-react-ui-kit";
import '../styles/App.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const BasketBtn = () => {
    const {basket} = useSelector(state => state.basket);
    return (
        <>
            {
               basket.length ? <Link to={'/cart'}>
                    <div className={`basketBtn d-block d-md-none`}>
                        <MDBIcon fab icon="opencart" />
                        <MDBBadge className='badge_cart' color='warning'>{basket.length}</MDBBadge>
                    </div>
                </Link> : null
            }
        </>
    );
};

export default BasketBtn;
