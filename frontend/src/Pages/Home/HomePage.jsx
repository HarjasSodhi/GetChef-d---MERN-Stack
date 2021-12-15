import './home.css'
import React from 'react';
import Features from '../../Components/Home/Features'
import Main from '../../Components/Home/Main'
import BestSellers from '../../Components/Home/BestSellers'
import Steps from '../../Components/Home/Steps'

const Homepage = () => {
    return (
        <>
            <Main />
            <Features />
            <BestSellers />
            <Steps />
        </>
    );
}

export default Homepage;
