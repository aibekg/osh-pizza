import React from 'react';
import '../../styles/Home.scss'
import {MDBIcon} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {setActiveItem} from "../../store/slices/menuSlice";
const MenuComponent = () => {
    const dispatch = useDispatch();
    const {active_item, items_menu} = useSelector(state => state.menu);

    return (
        <>
            <h3 className={'text-center mt-5 mb-3 text-li header_menu'}> <span>[ Меню ]</span> </h3>
            <div className={'menu_container'}>
                {
                    items_menu.map((item, index) => (
                        <span key={index} onClick={() => dispatch(setActiveItem({index}))} className={ active_item === index ?  'active_menu': ''}>
                            <MDBIcon fas icon={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    ))
                }
            </div>
        </>
    );
};

export default MenuComponent;
