import React from 'react';
import Container from '../Container/Container'
import './Header.css'
import Nav from '../Nav/Nav'
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario'
import menubar from '../../assets/images/menubar.png'




const Header = () => {
    return (
        <header className='headerpage'>
            <Container>
                <div className="header-flex">
                    <img src={menubar} alt='imagem menu barras. Serve para exibir ou esconder o menu no samartphone'/>
                
                   <Nav />

                   <PerfilUsuario/>

                </div>
            </Container>
        </header>
    );
};

export default Header;