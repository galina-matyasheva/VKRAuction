import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import infoHomes from "../HomeInfo";
import HomeCard from "./HomeList";
import {startLoadPhotos} from "../actions/photos";
import {connect} from "react-redux";



const CarouselDetailInfo = ({ errors, photos, dispatch }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(startLoadPhotos());
    }, []);

    useEffect(() => {
        if (photos.length > 0) {
            setIsLoading(false);
        }
    }, [photos]);

    return (
        <Carousel className='carousel'>
            {errors && errors.get_error && (
                <p className="errorMsg centered-message">{errors.get_error}</p>
            )}
            {isLoading ? (
                <div className="loading-msg centered-message">Loading...</div>
            ) : (
                photos.map((photo) => <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={`http://localhost:3000/api/photos/${photo._id}`}
                        alt='real'
                    />
                    <Carousel.Caption>
                        <h1>Аукцион недвижимости</h1>
                        <p>Лучшие предложения на нашем сайте</p>
                    </Carousel.Caption>
                </Carousel.Item>)
            )}

        </Carousel>
    );
};

const mapStateToProps = (state) => ({
    photos: state.photos || [],
    errors: state.errors || {}
});

export default connect(mapStateToProps)(CarouselDetailInfo);
