import React, {Component} from 'react';
import CarouselBox from '../Components/CarouselBox';
import infoHomes from '../HomeInfo';
import HomeList from '../Components/HomeList';
import SSO from '../Components/SSO';

export default class HomePage extends Component {
    render() {
        return (
            <div className='container indent'>
                <SSO/>
                <CarouselBox/>
                <h2>Специальные предложения</h2>
                <HomeList infoHomes={infoHomes}/>
                <div className='footer-copyright'>
                    © 2020 Home Auction
                    <span className='copyright'> website</span>
                </div>
            </div>
        )
    }
}