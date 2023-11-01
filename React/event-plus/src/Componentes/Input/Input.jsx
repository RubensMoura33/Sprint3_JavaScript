import React from 'react';

const Input = ({type, placeholder, name, id, value, onChange}) => {
    return (
        <>
            <input
             type="text" 
             id ='numero1'
            name='numero1' 
            value={value}
            placeholder='Primeiro numero' 
            onChange={onChange}
            />

            <span>{value}</span>
        </>
    );
};

export default Input;