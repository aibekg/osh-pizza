import React, {useEffect} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer,
    MDBRipple
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {getStocks} from "../store/slices/stockSlice";
import {HOST} from "../settings/config";

const StockPage = () => {
    const dispatch = useDispatch();
    const {stocks} = useSelector(state => state.stock);

    useEffect(() => {
        dispatch(getStocks());
    }, []);

    return (
        <>
            <MDBContainer style={{marginTop: 80}}>
                <h5>Нововости и акции</h5>
                <div className={'d-flex justify-content-start gap-3'}>
                    {
                        stocks.map(item => (
                            <MDBCard style={{ maxWidth: '30rem' }}>
                                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                    <MDBCardImage src={ HOST + '/uploads/' + item.img_url} fluid alt={item.title} />
                                </MDBRipple>
                                <MDBCardBody>
                                    <MDBCardTitle>{item.title}</MDBCardTitle>
                                    <MDBCardText>
                                        {item.description}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        ))
                    }
                </div>
            </MDBContainer>
        </>
    );
};

export default StockPage;
