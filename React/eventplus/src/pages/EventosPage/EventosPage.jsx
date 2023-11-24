import React, { useEffect, useState } from 'react';
import './EventosPage.css'
import Title from '../../components/Title/Title'
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIllustrator/ImageIllustrator'
import eventoImage from '../../assets/images/evento.svg'
import { Input, Button, Select } from '../../components/FormComponents/FormComponents'
import api, { eventsResource, eventsTypeResource } from '../../Services/Service';
import TableEvent from './TableEvent/TableEvent';
import Notification from '../../components/Notification/Notification'
import Spinner from "../../components/Spinner/Spinner"



const EventosPage = () => {
    //STATES
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao

    const IdInstituicao = "95A14FC6-240A-470E-9C8D-F6863772D99B"

    const [nomeEvento, setNomeEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idTipoEvento, setIdTipoEvento] = useState('');
    const [idEvento, setIdEvento] = useState(null);
    const [dataEvento, setDataEvento] = useState('');

    const [tiposEvento, setTipoEventos] = useState([]); 
    const [eventos, setEventos] = useState([]);
    const [notifyUser, setNotifyUser] = useState([])//Componente Notification
    const [showSpinner, setShowSpinner] = useState(false)//Spinner Loading

    //FUNCTIONS
    async function loadEventsType() {

        setShowSpinner(true);
        try {
            const retorno = await api.get(eventsTypeResource);
            setTipoEventos(retorno.data)
        }

        catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                imgIcon: 'danger',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true
            })

        } setShowSpinner(false);
    }

    async function loadEvents() {

        setShowSpinner(true);
        try {
            const retorno = await api.get(eventsResource);
            setEventos(retorno.data)
        }

        catch (error) {
            setNotifyUser({
                titleNote: 'Erro',
                textNote: 'Erro na operacao. Verifique sua conexao com a internet',
                imgIcon: 'danger',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true
            })
        } setShowSpinner(false);
    }

    useEffect(() => {
        loadEventsType()
        loadEvents()
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
        e.preventDefault();
        setShowSpinner(true);
        if (nomeEvento.trim().length < 3) {
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
            await api.post(eventsResource, {
                dataEvento: dataEvento,
                nomeEvento: nomeEvento,
                descricao: descricao,
                idTipoEvento: idTipoEvento,
                idInstituicao: IdInstituicao
            })
            setDataEvento('')
            setNomeEvento('')
            setDescricao('')
            setIdTipoEvento('')
            theMagic("Cadastrado com sucesso")

            loadEvents()

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
        e.preventDefault();
        setShowSpinner(true);
        if (nomeEvento.trim().length < 3) {
            setNotifyUser({
                titleNote: 'Aviso',
                textNote: 'O titulo deve conter pelo menos 3 caracteres',
                imgIcon: 'warning',
                imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                showMessage: true

            })
        }
        try {
            const promise = await api.put(`${eventsResource}/${idEvento}`, {
                dataEvento: dataEvento,
                nomeEvento: nomeEvento,
                descricao: descricao,
                idTipoEvento: idTipoEvento,
                idInstituicao: IdInstituicao

            })


            if (promise.status == 204) {
                setFrmEdit(false)
                setDataEvento('')
                setNomeEvento('')
                setDescricao('')
                setIdTipoEvento('')
                theMagic("Atualizado com sucesso")
                loadEvents()
            }
        }
        catch (error) {
            console.log({
                idEvento,
                dataEvento,
                nomeEvento,
                descricao,
                idTipoEvento,
                idInstituicao: IdInstituicao
            })
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

    function editActionAbort() {
        setShowSpinner(true);
        try {
            setFrmEdit(false)
            setDataEvento('')
            setNomeEvento('')
            setDescricao('')
            setIdTipoEvento('')
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

    async function showUpdateForm(idElement) {
        setShowSpinner(true);
        setFrmEdit(true)

        try {
            const promise = await api.get(`${eventsResource}/${idElement}`, { idElement })
            setDataEvento(promise.data.dataEvento.slice(0, 10))
            setNomeEvento(promise.data.nomeEvento)
            setDescricao(promise.data.descricao)
            setIdTipoEvento(promise.data.idTipoEvento)
            setIdEvento(idElement);

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

    async function handleDelete(idElement) {
        setShowSpinner(true);
        if (window.confirm('Confirma a exclusão')) {
            try {
                const promise = await api.delete(`${eventsResource}/${idElement}`, { idElement })
                if (promise.status == 204) {
                    theMagic("Excluido com sucesso")
                    const buscaEventos = await api.get(eventsResource);
                    setEventos(buscaEventos.data)
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

    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.idTipoEvento, text: element.titulo })
        })
        return arrayOptions
    }

    return (
        <>  {showSpinner ? <Spinner /> : null}
            {<Notification{...notifyUser} setNotifyUser={setNotifyUser} />}
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText="Cadastro de Evento" />
                            <ImageIlustrator imageRender={eventoImage} />

                            <form className='f-evento' onSubmit={frmEdit ? handleUpdate : handleSubmit}>
                                {
                                    !frmEdit ?
                                        (
                                            <>
                                                <Input
                                                    id='Nome'
                                                    type={'text'}
                                                    placeholdder={'Nome'}
                                                    name={'nome'}
                                                    required={'required'}
                                                    value={nomeEvento}
                                                    manipulationFunction={(e) => {
                                                        setNomeEvento(e.target.value)
                                                    }}
                                                />

                                                <Input
                                                    id='Descricao'
                                                    type={'text'}
                                                    placeholdder={'Descrição'}
                                                    name={'descricao'}
                                                    required={'required'}
                                                    value={descricao}
                                                    manipulationFunction={(e) => {
                                                        setDescricao(e.target.value)
                                                    }}
                                                />

                                                <Select
                                                    id='TiposEvento'
                                                    name={'tiposEvento'}
                                                    required={'required'}
                                                    options={tituloTipo(tiposEvento)}
                                                    value={idTipoEvento}
                                                    manipulationFunction={(e) => {
                                                        setIdTipoEvento(e.target.value)
                                                    }}
                                                />

                                                <Input
                                                    id='dataEvento'
                                                    type={'date'}
                                                    placeholdder={'dd/mm/aaaa'}
                                                    name={'Data'}
                                                    required={'required'}
                                                    value={dataEvento}
                                                    manipulationFunction={(e) => {
                                                        setDataEvento(e.target.value)
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
                                        ) :
                                        <>
                                            <Input
                                                id='Nome'
                                                type={'text'}
                                                placeholdder={'Nome'}
                                                name={'nome'}
                                                required={'required'}
                                                value={nomeEvento}
                                                manipulationFunction={(e) => {
                                                    setNomeEvento(e.target.value)
                                                }}
                                            />

                                            <Input
                                                id='Descricao'
                                                type={'text'}
                                                placeholdder={'Descrição'}
                                                name={'descricao'}
                                                required={'required'}
                                                value={descricao}
                                                manipulationFunction={(e) => {
                                                    setDescricao(e.target.value)
                                                }}
                                            />

                                            <Select
                                                id='TiposEvento'
                                                name={'tiposEvento'}
                                                required={'required'}
                                                options={tituloTipo(tiposEvento)}
                                                value={idTipoEvento}
                                                manipulationFunction={(e) => {
                                                    setIdTipoEvento(e.target.value)
                                                }}
                                            />

                                            <Input
                                                id='dataEvento'
                                                type={'date'}
                                                placeholdder={'dd/mm/aaaa'}
                                                name={'Data'}
                                                required={'required'}
                                                value={dataEvento}
                                                manipulationFunction={(e) => {
                                                    setDataEvento(e.target.value)
                                                }}
                                            />

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
                        <TableEvent
                            dados={eventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default EventosPage;