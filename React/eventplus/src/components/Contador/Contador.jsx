import React, { useState } from 'react';

const Contador = () => {

    const[contador, setContador] = useState(0);

    function handleIcrementar()
    {
        setContador(contador + 1)
    }
    function handleDecrementar()
    {
        if (contador == 0 ) {

            setContador (0)
            return
        }
        setContador(contador - 1)
    }
    return (
        <div>
            <h1>Contador</h1>
            <p>{contador}</p>
            <button onClick={handleIcrementar}>Incrementar</button>
            <button onClick={handleDecrementar}>Dencrementar</button>
        </div>
    );
};


export default Contador;