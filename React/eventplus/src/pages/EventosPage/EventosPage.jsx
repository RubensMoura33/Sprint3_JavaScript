import React from 'react';
import './EventosPage.css'
import Title from '../../components/Title/Title'
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIllustrator/ImageIllustrator'
import eventoImage from '../../assets/images/evento.svg'


const EventosPage = () => {
    //STATES
    //const [frmEdit, setFrmEdit] = useState(false);//esta em modo de edicao

    return (
        <>
        <MainContent>
            <section>
                <Container>
            <Title titleText="Cadastro de Evento"/>
            <ImageIlustrator imageRender={eventoImage}/>

            <form className='fevento'></form>

            <form action=""></form>
            </Container>
            </section>
        </MainContent>
        </>
    );
};

export default EventosPage;