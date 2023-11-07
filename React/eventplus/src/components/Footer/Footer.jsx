import React from 'react';
import Container from "../Container/Container"
import "./Footer.css"

const Footer = ( {textRights = "Escola Senai de Informatica - 2023"} ) => {
    return (
        <footer className='footer-page'>
            <p className="footer-page__rights">{textRights}</p>
        </footer>
    );
};

export default Footer;