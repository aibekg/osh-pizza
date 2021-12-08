import React, {useEffect} from 'react';
import {MDBCarousel, MDBCarouselElement, MDBCarouselInner, MDBCarouselItem} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {getStocks} from "../../store/slices/stockSlice";
import {HOST} from "../../settings/config";

const CarouselComponent = () => {
    const dispatch = useDispatch();
    const {stocks} = useSelector(state => state.stock)
    useEffect(() => {
        dispatch(getStocks());
    }, []);

    return (
        <>
            <MDBCarousel style={{marginTop: 60}} showControls interval={4000}>
                <MDBCarouselInner>
                    {
                        stocks.map((item, index) => (
                            <MDBCarouselItem key={index} className={index === 0 ? 'active': ''} >
                                <MDBCarouselElement src={HOST + '/uploads/' + item.img_url} alt={item.title} />
                            </MDBCarouselItem>
                        ))
                    }
                </MDBCarouselInner>
            </MDBCarousel>
        </>
    );
};

export default CarouselComponent;
