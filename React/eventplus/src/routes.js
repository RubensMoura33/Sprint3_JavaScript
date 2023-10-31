import React from "react";
import{Route, BrowserRouter, Routes} from "react-router-dom";

//Imports dos componentes - Paginas
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProdutoPage from "./pages/ProdutoPage/ProdutoPage";
const Rotas = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<HomePage />} path="/" exact/>
            <Route element={<LoginPage />} path="/produtos" />
            <Route element={<ProdutoPage />} path="/login" />
        </Routes>
        </BrowserRouter>
    )
}

export default  Rotas