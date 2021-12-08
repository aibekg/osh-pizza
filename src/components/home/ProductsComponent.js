import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MDBSpinner} from "mdb-react-ui-kit";
import "../../styles/Card.scss"
import {getProducts} from "../../store/slices/productSlice";
import CardComponent from "./CardComponent";

const ProductsComponent = () => {
    const {items_menu, active_item} = useSelector(state => state.menu);
    const {products, loading} = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(items_menu[active_item].category))
    }, [active_item]);

    return (
        <>
            <div style={{marginBottom: 100}}>
                <h2 className={'mt-3'}>{items_menu[active_item].title}</h2>
                <div className={'d-flex justify-content-around flex-wrap'}>
                    {
                        loading === 'pending' ?
                        <MDBSpinner style={{width: 50, height: 50}} role='status' color={'warning'} className={'mt-5'}>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner> :
                        products.map((item, index) => (
                            <CardComponent key={index} item={item} index={index}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default ProductsComponent;
