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

const TipoEventosPage = () => {
    //STATES
    const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao

    const [titulo, setTitulo] = useState("");

    const [tipoEventos, setTipoEventos] = useState([]);

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
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();//evita o submit do formulario
        if (titulo.trim().length < 3) {
            alert('O titulo deve ter pelo menos 3 caracteres')
        }

        try {
            const retorno = await api.post(eventsTypeResource, {
                titulo: titulo
            })
            alert('cadastrou')
        } catch (error) {
            alert('Deu ruim no submit')
        }
    }

    function handleUpdate() {
        alert('Bora Editar');
    }

    //cancela a tela/acao de edicao (volta para o form de cadastro)
    function editActionAbort() {
        alert('Cancelar a tela de edicao de dados')
    }

    //mostra o formulario de edicao
    function showUpdateForm() {
        alert('Vamos mostrar o formulario de edicao')
    }

    //apaga o tipo de evento na api
    function handleDelete(idElement) {
        alert(`Vamos apagar o evento de id ${idElement}`)
    }

    return (
        <>
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
                                                <span>{titulo}</span>
                                                <Button
                                                    textButton="Cadastrar"
                                                    id="cadastrar"
                                                    name="cadastrar"
                                                    //formulário só será chamado pois seu type é submit
                                                    type="submit" />
                                            </>
                                        )
                                        : (<p>Tela de Edição</p>)
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