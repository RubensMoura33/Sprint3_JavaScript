import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title"
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, { commentaryEventIdResource, commentaryEventResource, eventsResource, myEventsResource, presencesEventsResource } from "../../Services/Service";

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

  const [idEvento, setIdEvento] = useState(null)
  const [comentario, setComentario] = useState('')

  const [tipoEvento, setTipoEvento] = useState(''); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {

    loadEventsType()

  }, [tipoEvento, userData.userId]);

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {//para cada evento principal
      arrAllEvents[x].situacao = false;
      for (let i = 0; i < eventsUser.length; i++) {//procurar a correspondencia em minhas presencas
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento
          break;//paro de procurar para o evento principal atual
        }
      }
    }
    return arrAllEvents;
  }

  async function loadEventsType() {
    setShowSpinner(true)
    setEventos([]);

    if (tipoEvento === "1") {

      try {
        const retornoEvents = await api.get(eventsResource);
        const retornoMyEvents = await api.get(`${myEventsResource}/${userData.userId}`);

        const eventosMarcados = verificaPresenca(retornoEvents.data, retornoMyEvents.data);
        setEventos(eventosMarcados);

        console.clear();
        console.log('Todos os eventos');
        console.log(retornoEvents.data);

        console.log('Meus eventos');
        console.log(retornoMyEvents.data);

        console.log('EVENTOS MARCADOS');
        console.log(eventosMarcados);

      } catch (error) {
        console.log('Erro na api');
        console.log(error);
      }
    }

    else if (tipoEvento === "2") {
      try {
        const retorno = await api.get(`${myEventsResource}/${userData.userId}`);
        console.log(retorno.data);

        const arrEventos = [];//array vazio

        retorno.data.forEach(e => {
          arrEventos.push({ ...e.evento, situacao: e.situacao, idPresencaEvento: e.idPresencaEvento })
        });
        setEventos(arrEventos)

        console.log(arrEventos);
      } catch (error) {
        console.log('Erro na api');
        console.log(error);
      }
    }

    else {
      setEventos([])
    }

    setShowSpinner(false)
  }


  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent)
  }

  //ler um comentario
  const loadMyCommentary = async (idUsuario, idEvento) => {

    const promise = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
    console.log(promise.data.descricao);
    setComentario(promise.data.descricao)
  }

  //ler um comentario
  const postMyCommentary = async (descricao, idUsuario, idEvento) => {

    const promise = await api.post(commentaryEventResource, {
      descricao: descricao,
      exibe: true,
      idUsuario: idUsuario,
      idEvento: idEvento
    })
    console.log(descricao, idUsuario, idEvento);
    console.log(promise.data);
    if (promise.status === 201) {

      const promise = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
      console.log(promise.data.descricao);
      setComentario(promise.data.descricao)
    }
  }

  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({ ...userData, idEvento: idEvent });
  };

  //Remove o comentario
  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {

    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post(presencesEventsResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId
        })

        if (promise.status === 201) {

        } loadEventsType()

        return;
      } catch (error) {
        console.log(error);
      }

    }

    else if (whatTheFunction === "unconnect") {

      try {

        const rota = await api.delete(presencesEventsResource + "/" + presencaId)

        if (rota.status === 204) {

        }
        loadEventsType()

      } catch (error) {
        console.log(error);
      }
    }

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
            value={tipoEvento}
            addtionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;