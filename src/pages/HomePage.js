import React from 'react';
import '../styles/Home.scss'
import CarouselComponent from "../components/home/CarouselComponent";
import MenuComponent from "../components/home/MenuComponent";
import {MDBContainer} from "mdb-react-ui-kit";
import ProductsComponent from "../components/home/ProductsComponent";
import BasketBtn from "../utilis/BasketBtn";
const HomePage = () => {
    return (
        <>
            <CarouselComponent/>
            <MDBContainer >
                <MenuComponent/>
                <ProductsComponent/>
            </MDBContainer>
            <BasketBtn/>
        </>
    );
};

export default HomePage;
