import React from 'react';
import "./VisionSection.css"
import Titulo from '../Titulo/Titulo';

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Titulo
                titleText={"Visao"}
                color="white"
                batataClass='vision__title'
                />
                <p className="vision__text">Lorem </p>
            </div>
        </section>
    );
};

export default VisionSection;