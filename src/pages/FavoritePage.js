import React from 'react';
import {MDBContainer} from "mdb-react-ui-kit";
import '../styles/App.scss'
import {useSelector} from "react-redux";
import CardComponent from "../components/home/CardComponent";
const FavoritePage = () => {
    const {favorites} = useSelector(state => state.favorite);

    return (
        <div>
            <MDBContainer style={{marginTop: 80, marginBottom: 100}}>
                <h5 style={{color: '#006260'}}>Избранные</h5>
                {
                    favorites[0] ?
                       (<div className={'favorite_block'}>
                           {
                               favorites.map((item, index) => <CardComponent key={index} item={item} index={index}/>)
                           }
                        </div>) :
                        (<div className={'favorite_empty_block'}>
                            <div className={'favorite_empty_text'}> Здес пока пусто</div>
                        </div>)
                }
            </MDBContainer>
        </div>
    );
};

export default FavoritePage;
