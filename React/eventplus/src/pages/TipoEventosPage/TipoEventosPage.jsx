import React, { useEffect, useState } from 'react';
import './TipoEventosPage.css'
import Title from '../../components/Title/Title'
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIllustrator/ImageIllustrator'
import tipoEventoImage from '../../assets/images/tipo-evento.svg'
import { Input, Button } from '../../components/FormComponents/FormComponents'
import api, { eventsTypeResource } from '../../Services/Service';
import TableTp from './TableTP/TableTp'
import Notification from '../../components/Notification/Notification'
import Spinner from "../../components/Spinner/Spinner"

const TipoEventosPage = () => {
    //STATES
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null);//para editar, por causa do evento!
    const [tipoEventos, setTipoEventos] = useState([]);//array
    const [notifyUser, setNotifyUser] = useState([])//Componente Notification
    const [showSpinner, setShowSpinner] = useState(false);//Spinner Loading

    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true);

            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data)
                console.log(retorno.data);
            }
            
            catch (error) {
                setNotifyUser({
                    titleNote: 'Erro',
                    textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                    imgIcon: 'danger',
                    imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                    showMessage: true
                })
            }
            setShowSpinner(false);
        }

        loadEventsType();
    }, [])

    function theMagic(textNote) {

        setNotifyUser({
            titleNote: 'Sucesso',
            textNote,
            imgIcon: 'Success',
            imgAlt: 'Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok.',
            showMessage: true
        })
    }

    async function handleSubmit(e) {
        setShowSpinner(true);
        e.preventDefault();//evita o submit do formulario
        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: 'Aviso',
                textNote: 'O titulo deve conter pelo menos 3 caracteres',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true

            })
            return;
        }

        try {
            const retorno = await api.post(eventsTypeResource, {
                titulo: titulo
            })
            if (retorno.status == 201) {

                theMagic("Cadastrado com sucesso")
                const buscaEventos = await api.get(eventsTypeResource);
                setTipoEventos(buscaEventos.data)
            }

        } catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
        setShowSpinner(false);
    }

    async function handleUpdate(e) {
        setShowSpinner(true);
        e.preventDefault();
        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: 'Aviso',
                textNote: 'O titulo deve conter pelo menos 3 caracteres',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true

            })
            return;
        }
        try {
            const promise = await api.put(eventsTypeResource + '/' + idEvento, { titulo: titulo }) // o id esta no state

            if (promise.status == 204) {
                setFrmEdit(false)
                setTitulo("")//reseta as variaveis
                setIdEvento(null)//reseta as variaveis
                theMagic("Atualizado com sucesso")
                const buscaEventos = await api.get(eventsTypeResource);
                setTipoEventos(buscaEventos.data)
            }
        } catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
        setShowSpinner(false);
    }

    //cancela a tela/acao de edicao (volta para o form de cadastro)
    function editActionAbort() {
        setShowSpinner(true);
        setFrmEdit(false)
        setTitulo("")//reseta as variaveis
        setIdEvento(null)//reseta as variaveis
        setShowSpinner(false);
    }

    //mostra o formulario de edicao
    async function showUpdateForm(idElement) {
        setShowSpinner(true);
        setFrmEdit(true)
        try {
            const promise = await api.get(`${eventsTypeResource}/${idElement}`, { idElement })
            setTitulo(promise.data.titulo)
            setIdEvento(idElement)//preenche o id do evento para poder atualizar
        } catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        }
        setShowSpinner(false);

    }

    //apaga o tipo de evento na api
    async function handleDelete(idElement) {
        setShowSpinner(true);

        if (window.confirm('Confirma a excludao?')) {

            try {
                const promise = await api.delete(`${eventsTypeResource}/${idElement}`, { idElement })
                if (promise.status == 204) {

                    theMagic("Excluido com sucesso")
                    const buscaEventos = await api.get(eventsTypeResource);
                    setTipoEventos(buscaEventos.data)
                }

            } catch (error) {
                setNotifyUser({
                    titleNote: 'Erro',
                    textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                    imgIcon: 'warning',
                    imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                    showMessage: true
                })
            }
            setShowSpinner(false);
        }
    }



    return (
        <>
            {<Notification{...notifyUser} setNotifyUser={setNotifyUser} />}
            {/*SPINNER - Feito com position*/}
            {showSpinner ? <Spinner/> : null}
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className='cadastro-evento__box'>
                            <Title titleText={"Cadastro Tipo de Eventos"} />

                            <ImageIlustrator imageRender={tipoEventoImage} />

                            <form className='ftipo-evento' onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                                {
                                    !frmEdit ?
                                        (
                                            <>
                                                <Input
                                                    id="Titulo"
                                                    placeholdder={"Titulo"}
                                                    name={"titulo"}
                                                    type={"text"}
                                                    required={"required"}
                                                    value={titulo}
                                                    manipulationFunction={(e) => {
                                                        setTitulo(e.target.value);
                                                    }}
                                                />
                                                <Button
                                                    textButton="Cadastrar"
                                                    id="cadastrar"
                                                    name="cadastrar"
                                                    //formulário só será chamado pois seu type é submit
                                                    type="submit"
                                                />

                                            </>


                                        )
                                        :
                                        <>
                                            <Input
                                                id="Titulo"
                                                placeholdder={"Titulo"}
                                                name={"titulo"}
                                                type={"text"}
                                                required={"required"}
                                                value={titulo}
                                                manipulationFunction={(e) => {
                                                    setTitulo(e.target.value);
                                                }} />
                                            <div className="buttons-editbox">
                                                <Button
                                                    textButton="Atualizar"
                                                    id="atualizar"
                                                    name="atualizar"
                                                    //formulário só será chamado pois seu type é submit
                                                    type="submit"
                                                    addtionalClass="button-component--middle"
                                                />

                                                <Button
                                                    textButton="Cancelar"
                                                    id="cancelar"
                                                    name="cancelar"
                                                    //formulário só será chamado pois seu type é submit
                                                    type="submit"
                                                    manipulationFunction={editActionAbort}
                                                    addtionalClass="button-component--middle"
                                                />
                                            </div>
                                        </>
                                }
                            </form>
                        </div>
                    </Container>
                </section>

                <section className='lista-eventos-section'>
                    <Container>
                        <Title titleText={"Lista Tipo de Eventos"} color="white"></Title>
                        <TableTp
                            dados={tipoEventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPage;