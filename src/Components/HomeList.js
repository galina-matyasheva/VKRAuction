import React, {useEffect, useState} from 'react';
import HomeCard from './HomeCard';
import {startLoadProperties} from "../actions/photos";
import Carousel from "react-bootstrap/Carousel";
import {connect} from "react-redux";

export default function HomeList({infoHomes}) {

    const homeElements = infoHomes.map(infoHomes =>
    <li key={infoHomes.id} className='home-list-element'><HomeCard infoHome = {infoHomes}/></li>
    );
    return(
        <ul className='home-list'>
            {homeElements}
        </ul>
    )
}

