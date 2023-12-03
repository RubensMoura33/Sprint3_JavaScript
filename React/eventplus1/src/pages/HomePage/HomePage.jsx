import React, {useContext, useEffect, useState} from 'react';
import './HomePage.css'
import Banner from '../../components/Banner/Banner'
import MainContent from '../../components/Main/MainContent';
import VisionSection from '../../components/VisionSection/VisionSection';
import ContactSection from '../../components/ContactSection/ContactSection'
import Title from '../../components/Title/Title'
import NextEvent from '../../components/NextEvent/NextEvent';
import Container from '../../components/Container/Container';
import api from '../../Services/Service'
import { nextEventResource } from '../../Services/Service';
import Notification from '../../components/Notification/Notification';
import { UserContext } from '../../context/AuthContext';


const HomePage = () => {

    const {userData} = useContext(UserContext);

    const [nextEvents, setNextEvents] = useState([]);//dados mokcdados
    const [notifyUser, setNotifyUser] = useState([])

    //roda somente na inicialização do componente
    useEffect( () => {
        async function getNextEvents() {
            try {
                const promise = await api.get(`${nextEventResource}`);
                const dados = await promise.data;

                setNextEvents(dados);//atualiza o state
            } catch (error) {
                setNotifyUser({
                    titleNote: 'Erro',
                    textNote:'Erro na operacao. Verifique sua conexao com a internet',
                    imgIcon: 'danger',
                    imgAlt: 'Imagem de ilustracao de erro. Rapaz segurando letra x.',
                    showMessage: true
                })
            }
        }
        getNextEvents(); //roda a função
    }, []);

    return (
       
           <MainContent>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser}/>}
                <Banner/>
                <section className='proximos-eventos'>
                    <Container>
                        <Title titleText={"Proximos Eventos"}/>

                        <div className='events-box'>

                            {
                                nextEvents.map((e) => {
                                    return(
                                        <NextEvent
                                        key={e.idEvento}
                                        title={e.nomeEvento}
                                        description={e.descricao}
                                        eventDate={e.dataEvento}
                                        idEvent={e.idEvento}
                                    />
                                    )
                                })
                            }

                            
                              
                        </div>
                    </Container>
                </section>
                <VisionSection/>
                <ContactSection/>
                    
           </MainContent>
       
    );
};

export default HomePage;