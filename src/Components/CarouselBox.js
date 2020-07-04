import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import realImg from '../assets/real.jpg';
import real1Img from '../assets/real1.jpg';
import real2Img from '../assets/real2.jpg';
import real3Img from '../assets/real3.jpg';
import real4Img from '../assets/real4.jpg';

export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel className='carousel'>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={realImg}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={real1Img}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={real2Img}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={real3Img}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={real4Img}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

