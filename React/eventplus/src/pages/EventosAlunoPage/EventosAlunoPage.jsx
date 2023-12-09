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
import Notification from "../../components/Notification/Notification";

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

  //Notify
  const [notifyUser, setNotifyUser] = useState();

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

  function Notify(titleNote, textNote, imgIcon, imgAlt) {
    setNotifyUser({
      titleNote,
      textNote,
      imgIcon,
      imgAlt,
      showMessage: true,
    });
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

    try {
      const promise = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
      console.log(promise.data);
      setComentario(promise.data.descricao)

    } catch (error) {

      Notify(
        "Erro",
        "Verifique a conexão com a internet",
        "danger",
        "Imagem de erro. Rapaz segurando um balão com símbolo x"
      );
      console.log(error);
      return;
      
    }
  }

  //ler um comentario
  const postMyCommentary = async (descricao, idUsuario, idEvento) => {

    try {
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
        console.log(promise.data);
        setComentario(promise.data.descricao)
        Notify(
          "Sucess",
          "Comentario cadastrado com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        );
      }
    } catch (error) {

      Notify(
        "Erro",
        "O cadastro deve ter no mínimo 3 caracteres",
        "warning",
        "Imagem de aviso. Boneco batendo na exclamação"
      );
      console.log(error);
      return;
    }
  }

  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({ ...userData, idEvento: idEvent });
  };

  //Remove o comentario
  const commentaryRemove = async (idComentarioEvento, idUsuario, idEvento) => {

    try {
      
      const GetById = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
      idComentarioEvento = GetById.data.idComentarioEvento

      const promise = await api.delete(commentaryEventResource + '/' + idComentarioEvento)
      if (promise.status === 204) {

        const GetDesc = await api.get(commentaryEventIdResource + '?idUsuario=' + idUsuario + '&idEvento=' + idEvento);
        console.log(promise.data);
        setComentario(GetDesc.data.descricao)
        Notify(
          "Sucess",
          "Excluido com sucesso",
          "success",
          "Imagem de sucesso. Moça segurando balão"
        );
      }

    } catch (error) {

      Notify(
        "Erro",
        "Nenhum comentario para ser excluido",
        "danger",
        "Imagem de erro. Boneco batendo na exclamação"
      );
      console.log(error);
      return;
    }

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

        Notify(
          "Erro",
          "O cadastro deve ter no mínimo 3 caracteres",
          "warning",
          "Imagem de aviso. Boneco batendo na exclamação"
        );
        console.log(error);
        return;
      }

    }

    else if (whatTheFunction === "unconnect") {

      try {

        const rota = await api.delete(presencesEventsResource + "/" + presencaId)

        if (rota.status === 204) {

        }
        loadEventsType()

      } catch (error) {

        Notify(
          "Erro",
          "O cadastro deve ter no mínimo 3 caracteres",
          "warning",
          "Imagem de aviso. Boneco batendo na exclamação"
        );
        console.log(error);
        return;
      }
    }

  }
  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
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