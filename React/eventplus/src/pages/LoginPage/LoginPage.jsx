import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import loginImage from "../../assets/images/login.svg"
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api from "../../Services/Service";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [user, setUser] = useState({ email: "moura@admin.com", senha: "123456" })

    //Dados Globais do usuario
    const { userData, setUserData } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.name) navigate("/")
    }, [userData])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(user);
        if (user.email.length >= 3 && user.senha.length >= 3) {
            try {
                const promise = await api.post("/Login",
                    {
                        email: user.email,
                        senha: user.senha
                    })

                const userFullToken = userDecodeToken(promise.data.token);
                setUserData(userFullToken);
                localStorage.setItem("token", JSON.stringify(userFullToken));
                navigate("/")
            } 
            catch (error) {
                alert("erro")
            }

        }
        else {
            alert('O email e senha deve ter no minimo 3 caracteres')
            return
        }

    }

    return (
        <div className="layout-grid-login">
            <div className="login">
                <div className="login__illustration">
                    <div className="login__illustration-rotate"></div>
                    <ImageIllustrator
                        imageRender={loginImage}
                        imageName="login"
                        altText="Imagem de um homem em frente de uma porta de entrada"
                        additionalClass="login-illustrator "
                    />
                </div>

                <div className="frm-login">
                    <img src={logo} className="frm-login__logo" alt="" />

                    <form className="frm-login__formbox" onSubmit={handleSubmit}>
                        <Input
                            addtionalClass="frm-login__entry"
                            type="email"
                            id="login"
                            name="login"
                            required={true}
                            value={user.email}
                            manipulationFunction={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value.trim()
                                })
                            }}
                            placeholder="Username"
                        />
                        <Input
                            addtionalClass="frm-login__entry"
                            type="password"
                            id="senha"
                            name="senha"
                            required={true}
                            value={user.senha}
                            manipulationFunction={(e) => {
                                setUser({
                                    ...user, senha: e.target.value.trim()
                                })
                            }}
                            placeholder="****"
                        />

                        <a href="" className="frm-login__link">
                            Esqueceu a senha?
                        </a>

                        <Button
                            buttonText="Login"
                            id="btn-login"
                            name="btn-login"
                            type="submit"
                            additionalClass="frm-login__button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
