import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


//PAGINAS
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage';
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage"
import EventosPage from "../pages/EventosPage/EventosPage"
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


const routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route element={<HomePage/>} path={"/"} exact />
                <Route element={<LoginPage/>} path={"/login"} />
                <Route element={<TipoEventosPage/>} path={"/tipo-eventos"} />
                <Route element={<EventosPage/>} path={"/eventos"} />
            </Routes>
            <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default routes;