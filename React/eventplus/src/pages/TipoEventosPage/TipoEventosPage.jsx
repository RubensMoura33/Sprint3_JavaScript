import React, {useState} from 'react';
import './TipoEventosPage.css'
import Title from '../../components/Title/Title'
import MainContent from '../../components/Main/MainContent';
import Container from '../../components/Container/Container';
import ImageIlustrator from '../../components/ImageIllustrator/ImageIllustrator';

const TipoEventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);

    function handleSubmit() {
        alert('Bora cadastrar')
    }

    function handleUpdate() {
        alert('Bora editar')
    }
    return (
        <>
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className='cadastro-evento__box'>
                            <Title titleText={"Cadastro Tipo de Eventos"} />

                            <ImageIlustrator imageName={'tipo-evento'} alteText={'testando'} />

                            <form className='ftipo-evento'onSubmit={frmEdit ? handleUpdate: handleSubmit}>
                            {!frmEdit? (<p>Tela de Cadastro</p>) : (<p>Tela de Edicao</p>)}
                            </form>
                        </div>
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPage;