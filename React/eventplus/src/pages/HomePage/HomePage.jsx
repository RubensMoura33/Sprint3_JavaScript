import React from 'react';
import Banner from '../../components/Banner/Banner';
import MainContent from '../../components/Main/MainContent';
import Footer from '../../components/Footer/Footer';
import Titulo from '../../components/Titulo/Titulo';
import './HomePage.css'
import VisionSection from '../../components/VisionSection/VisionSection';
// import Header from '../../components/Header/Header'

const HomePage = () => {
    return (
       <div>
            <Banner/>
            <MainContent>
            <VisionSection/>
            </MainContent>

       </div>
    );
};

export default HomePage;