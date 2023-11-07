import React from 'react';
import './Titulo.css'

const Titulo = ({ titleText, color = "", batataClass = ""}) => {
    return (
    <h1 className={`title ${batataClass}`} style = {{color : color}}>
        {titleText}
        <hr 
        className="title__underscore"
        style={ color !== "" ? {borderColor : color} : {} }
        />
    </h1>
);
};

export default Titulo;