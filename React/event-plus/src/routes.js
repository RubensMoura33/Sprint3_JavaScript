import React from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom"

//import dos componenetes de pagina
import HomePage from "./Pages/HomePage/HomePage"
import Eventos from "./Pages/Eventos/Eventos"
import TipoEventos from "./Pages/TipoEventos/TipoEventos"
import Login from "./Pages/Login/Login"
import TestePage from './Pages/TestePage/TestePage';
// import Header from './Componentes/Header copy/Header';


const Rotas = () => {
    return (
        <BrowserRouter>
        {/* <Header /> */}
        <Routes>
            <Route element={<HomePage />} path='/' exact />
            <Route element={<Eventos />} path='/eventos'/>
            <Route element={<Login />} path='/login'/>
            <Route element={<TipoEventos />} path='/tipoevento'/>
            <Route element={<TestePage />} path='/teste'/>
        </Routes>
        
        </BrowserRouter>
    );
};

export default Rotas;