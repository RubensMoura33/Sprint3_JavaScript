import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title"
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, { eventsResource, myEventsResource } from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState(''); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {

    loadEventsType()

  }, [tipoEvento]);

  const verificaPresenca = (arrAllEvents, eventsUser) =>{
    for(let x = 0; x < arrAllEvents.length; x++ ){
      for(let i = 0; i< eventsUser.length; i++){
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          break;
        }
      }
    }
  }

  async function loadEventsType() {
    setShowSpinner(true)
    setEventos([]);

    if (tipoEvento === "1") {

      try {
        const retorno = await api.get(eventsResource)
        setEventos(retorno.data)
        console.log(retorno.data);

      } catch (error) {
        console.log('Erro na api');
        console.log(error);
      }
    }

    else if ( tipoEvento === "2") {
      try {
        const retorno = await api.get(`${myEventsResource}/${userData.userId}`);
        console.log(retorno.data);

        const arrEventos = [];//array vazio

        retorno.data.forEach( e => {
          arrEventos.push(e.evento)
        });
        setEventos(arrEventos)

        console.log(arrEventos);
      } catch (error) {
        console.log('Erro na api');
        console.log(error);
      }
    }

    else{
      setEventos([])
    }

    setShowSpinner(false)
  }


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent)
  }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    alert("Desenvolver a função conectar evento");
  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            defaultValue={tipoEvento}
            addtionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;