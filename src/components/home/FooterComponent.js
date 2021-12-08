import React from 'react';
import {Link} from "react-router-dom";
import {MDBCol, MDBIcon, MDBRow, MDBTypography} from "mdb-react-ui-kit";
import '../../styles/Home.scss'

const FooterComponent = () => {
    return (
        <>
            <div className={'footer_'}>
                <div className={'footer_icon'}/>
                <MDBRow className={'m-0 p-0'}>
                    <MDBCol className={'mt-4'} xs={12} md={3}>
                        <MDBTypography>Телефон:</MDBTypography>
                        <a href={'tel:0776613090'} style={{color:"white"}}> +996776 613 090</a>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-4'}>
                        <MDBTypography>Время работы:</MDBTypography>
                        <MDBTypography>Ежедневно с 8:00 до 0:00</MDBTypography>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-4'}>
                        <MDBTypography> Email:</MDBTypography>
                        <MDBTypography>aibek.kdm90@gmail.com</MDBTypography>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-4'}>
                        <MDBTypography> Социальные сети:</MDBTypography>
                        <MDBTypography>
                            <a href="https://web.telegram.org/z/#-555248659">
                                <MDBIcon className={'mx-4'} style={{color:'white'}}  size={'lg'} fab icon="telegram-plane" />
                            </a>
                            <a href="https://www.instagram.com/a.ibek_/" >
                                <MDBIcon className={'text-white d-inline-block mx-3'} size={'lg'} fab icon="instagram" />
                            </a>
                        </MDBTypography>
                    </MDBCol>
                </MDBRow>
                <hr color={'white'}/>
                <MDBRow className={'m-0 p-0'}>
                    <MDBCol xs={12} md={3} className={'mt-3'}>
                       <div style={{fontSize: 20}}>
                           Osh<span className={'text-warning'}> - </span>Pizza
                           <MDBIcon className={'ms-2'} color={'warning'} fas icon="pizza-slice" />
                       </div>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-3'}>
                        <div className={'d-flex justify-content-around flex-wrap'}>
                            <Link to={'/'}> <MDBTypography>Главная</MDBTypography></Link>
                            <Link to={'/stocks'}>  <MDBTypography>Новости</MDBTypography></Link>
                            <Link to={'/profile'}>  <MDBTypography>Личный профиль</MDBTypography></Link>
                        </div>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-3'}>
                        <span >Политика конфиденцияльности</span>
                    </MDBCol>
                    <MDBCol xs={12} md={3} className={'mt-3 mb-3'}>
                        <hr className={'d-block d-md-none'} color={'white'}/>
                        <span style={{color:'#07d4d7'}} >&copy; Go Space Group</span>
                    </MDBCol>
                </MDBRow>
            </div>
        </>
    );
};

export default FooterComponent;
