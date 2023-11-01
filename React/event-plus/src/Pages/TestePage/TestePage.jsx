import React, { useState } from 'react';
import Input from "../../Componentes/Input/Input"
import Button from "../../Componentes/Button/Button"
import Header from '../../Componentes/Header/Header';


const TestePage = () => {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [total, setTotal] = useState()

    function handleCalcular(e)
    {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }
    return (
        <div>
                <Header/>
            <h1>Página de Poc`s</h1>
            <h2>Calculator</h2>

            <form  onSubmit={handleCalcular}>

                <Input 
                    type="number" 
                    placeholder="Digite um numero" 
                    name="n1" 
                    id="n1" 
                    value={n1}
                    onChange={(e) => {
                        setN1(e.target.value)
                    }}
                />
                <br />
                <Input
                    type="number"
                    placeholder="Digite um numero" 
                    name="n2" 
                    id="n2" 
                    value={n2}
                    onChange={(e) => {
                        setN2(e.target.value)
                    }}
                 />
                <br />
                <Button onClick= {handleCalcular} textButton="Calcular" type="submit"/>

                <span>Resultado: 
                    <strong id='res'>
                    {total}
                    </strong>
                    </span>

            </form>
                <p> Valor do N1 {n1}</p>
                <p> Valor do N2 {n2}</p>
           
        </div>
    );
};

export default TestePage;