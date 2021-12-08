import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand, MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler
} from "mdb-react-ui-kit";
import {Link, NavLink} from "react-router-dom";
import '../../styles/Home.scss'
import {useSelector} from "react-redux";

const NavbarComponent = () => {
    const [showNavText, setShowNavText] = useState(false);
    const {basket} =  useSelector(state => state.basket);
    const handleClick = () => {
        setShowNavText(false)
    }
    return (
        <>
            <MDBNavbar fixed={'top'} expand='lg' light bgColor='light'>
                <MDBContainer >
                    <MDBNavbarBrand>
                        Osh<span className={'text-warning'}> - </span>Pizza
                        <MDBIcon className={'ms-2'} color={'warning'} fas icon="pizza-slice" />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarText'
                        aria-controls='navbarText'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavText(!showNavText)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavText}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 d-flex gap-4 justify-content-center'>
                            <MDBNavbarItem>
                                <NavLink onClick={handleClick} to='/'>Главная</NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <NavLink onClick={handleClick} to='/stocks'>Новости и акции</NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <NavLink onClick={handleClick} to='/favorites'>Избранное</NavLink>
                            </MDBNavbarItem>
                            {/*<MDBNavbarItem>*/}
                                {/*<NavLink onClick={handleClick} to='/profile'>Личный кобинет</NavLink>*/}
                            {/*</MDBNavbarItem>*/}
                        </MDBNavbarNav>
                        <Link to={'/cart'} >
                            <MDBBtn onClick={handleClick} className={'navbar_button'}  color={'warning'} >Корзина | {basket.length} </MDBBtn>
                        </Link>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
};

export default NavbarComponent;
