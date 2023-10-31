import './Title.css';

import React from "react";

const Title = (props) => {

    return(<h1 className="title">Hello {props.text}</h1>);
}

export default Title;