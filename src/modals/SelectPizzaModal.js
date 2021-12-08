import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBIcon, MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {HOST} from "../settings/config";
import {SetBasket} from "../store/slices/basketSlice";
import {setSelectPizzaModal} from "../store/slices/modalSlice";
import {useDispatch, useSelector} from "react-redux";

const SelectPizzaModal = () => {
    const dispatch = useDispatch();
    const {selectPizza, pizza} = useSelector(state => state.modal);
    const [sizePizza, setSizePizza] = useState('standard');
    const [additives, setAdditives] = useState([]);
    const [additivesPrice, setAdditivesPrice] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if(pizza){
            setPrice(+pizza.price[sizePizza]);
        }
    }, [pizza])

    const toggleShow = () => {
        dispatch(setSelectPizzaModal({pizza: null}));
    };

    const setAdditive = (additive) => {
        const a = additives.filter(item => item.id === additive.id);
        if(Object.keys(a).length >= 1){
            setAdditives(p => p.filter(item => item.id !== additive.id));
            setAdditivesPrice(p => p - (+additive.price))
        }else{
            setAdditives(p => [...p, additive]);
            setAdditivesPrice( p => p + (+additive.price))
        }
    }
    const AddToBasket = () => {
        dispatch(SetBasket({
            product: {
                id: pizza.id,
                title: pizza.title,
                description: sizePizza === 'big' ? 'Большой, ': sizePizza === 'standard' ? 'Стандарт, ': 'Маленький, ',
                price: price + additivesPrice,
                additives: additives.map(item => item.title),
                img_url: pizza.img_url,
                piece: 1
            }
        }));
        setAdditives([]);
        toggleShow()
    }

    const setPizzaSize = (size) => {
        setSizePizza(size);
        if(pizza.discount === null) {
            setPrice(+pizza.price[size]);
        }else{
            setPrice(+pizza.price[size] - +pizza.price[size] * pizza.discount/100);
        }
    }

    return (
        <>
            <MDBModal staticBackdrop  show={selectPizza} setShow={selectPizza} tabIndex='-1'>
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{pizza &&  pizza.title}</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            />
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className={'pizza_modal_img'} style={{backgroundImage: `url(${pizza && HOST + '/uploads/' + pizza.img_url})`}}/>
                            <h5>Размер</h5>
                            <div className={'d-flex gap-4 justify-content-start mb-4'}>
                                {
                                    [{title: 'smaller', size: '25см'}, {title: 'standard', size: '30см'}, {title: 'big', size: '35см'}].map((item, index) => (
                                        <MDBBtn
                                            onClick={() => setPizzaSize(item.title)}
                                            color={item.title === sizePizza ? 'danger': 'light'}
                                            rounded
                                            key={index}>{item.size}</MDBBtn>
                                    ))
                                }
                            </div>
                            <h5>Добавить</h5>
                            <div className={'d-flex justify-content-between flex-wrap'}>
                                {
                                    pizza !== null ? pizza.additives.map(item => {
                                        const a = additives.filter(data => data.id === item.id);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => setAdditive(item)}
                                                className={`additive_card ${a.length ? 'bc_yellow': 'bc_grey'}`}>
                                                <div className={'additive_img'}
                                                     style={{backgroundImage: `url(${pizza && HOST + '/uploads/' + item.img_url})`}}/>
                                                <div className={'additive_title'}>{item.title}</div>
                                                <MDBIcon className={a.length ? 'd-block additive_card_icon': 'd-none additive_card_icon'} fas icon="check-circle"/>
                                                <div className={'additive_price'}>{item.price}сом</div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <div className={'select_pizza_all_price'}>{price + additivesPrice} сом</div>
                            <MDBBtn color='secondary' onClick={toggleShow}>Отмена</MDBBtn>
                            <MDBBtn onClick={AddToBasket}>В корзину</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default SelectPizzaModal;
