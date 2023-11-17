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

const TipoEventosPage = () => {
    //STATES
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao
    const [titulo, setTitulo] = useState("");
    const [tipoEventos, setTipoEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState([])

    useEffect(() => {
        async function loadEventsType() {
            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data)
                console.log(retorno.data);
            }
            catch (error) {
                console.log('Erro na api');
                console.log(error);
            }
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
        e.preventDefault();//evita o submit do formulario
        if (titulo.trim().length < 3) {
            alert('O titulo deve ter pelo menos 3 caracteres')
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
            alert('Deu ruim no submit')
        }
    }

    async function handleUpdate(idElement) {

    }

    //cancela a tela/acao de edicao (volta para o form de cadastro)
    function editActionAbort() {
        setFrmEdit(false)
    }

    //mostra o formulario de edicao
    async function showUpdateForm(idElement) {
        setFrmEdit(true)
        try {
            const promise = await api.get(`${eventsTypeResource}/${idElement}`, { idElement })
            setTitulo(promise.data.titulo)
        } catch (error) {

        }

    }

    //apaga o tipo de evento na api
    async function handleDelete(idElement) {

        if (window.confirm('Confirma a excludao?')) {

            try {
                const promise = await api.delete(`${eventsTypeResource}/${idElement}`, { idElement })
                if (promise.status == 204) {

                    theMagic("Excluido com sucesso")
                    const buscaEventos = await api.get(eventsTypeResource);
                    setTipoEventos(buscaEventos.data)
                }

            } catch (error) {
                alert('Deu ruim no submit')
            }
        }
    }



    return (
        <>
            {<Notification{...notifyUser} setNotifyUser={setNotifyUser} />}
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