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
    const IdInstituicao = "95a14fc6-240a-470e-9c8d-f6863772d99b"
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao
    const [nomeEvento, setNomeEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idTipoEvento, setIdTipoEvento] = useState('')
    const [tiposEvento, setTipoEventos] = useState([]);
    const [dataEvento, setDataEvento] = useState();
    const [eventos, setEventos] = useState([]);

    //FUNCTIONS
    useEffect(() => {

        async function loadEventsType() {

            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data)
                console.log(retorno.data);
            }

            catch (error) {
                alert('erro')
            }
        }

        loadEventsType()
    }, [])

    useEffect(() => {

        async function loadEvents() {

            try {
                const retorno = await api.get(eventsResource);
                setEventos(retorno.data)
                console.log(retorno.data);
            }

            catch (error) {
                alert('erro')
            }
        }

        loadEvents()
    }, [])


    function theMagic(textNote) {

        // setNotifyUser({
        //     titleNote: 'Sucesso',
        //     textNote,
        //     imgIcon: 'Success',
        //     imgAlt: 'Imagem de ilustracao de sucesso. Moca segurando um balao com simbolo de confirmacao ok.',
        //     showMessage: true
        // })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (nomeEvento.trim().length < 3) {
            alert('Nome do evento deve conter pelo menos 3 caracteres')
            return;
        }

        try {
            const promise = await api.post(eventsResource, 
                {dataEvento: dataEvento,
                 nomeEvento: nomeEvento,
                 descricao: descricao,
                 idTipoEvento: tiposEvento,
                 idInstituicao: IdInstituicao
                })

                if (promise.status == 201) {
                    const buscaEventos = await api.get(eventsResource);
                    setEventos(buscaEventos.data)
                }

        } catch (error) {
            alert('erro')
        }
    }

    async function handleUpdate() { }

    function editActionAbort() { }

    async function showUpdateForm() { }

    async function handleDelete(idElement)
     {
        if (window.confirm('Confirma a exclusão')) {
            try {
                const promise = await api.delete(`${eventsResource}/${idElement}`, { idElement })
                if (promise.status == 204) {
                    const buscaEventos = await api.get(eventsResource);
                    setEventos(buscaEventos.data)
                }
            } catch (error) {
                alert('erro')
            }
        }
      }

    function tituloTipo(tipoEventos) {
        let arrayOptions = []

        tipoEventos.forEach(element => {
            arrayOptions.push({ value: element.IdTipoEvento, text: element.titulo })
        })
        return arrayOptions
    }

    return (
        <>

            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText="Cadastro de Evento" />
                            <ImageIlustrator imageRender={eventoImage} />

                            <form className='f-evento'>
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