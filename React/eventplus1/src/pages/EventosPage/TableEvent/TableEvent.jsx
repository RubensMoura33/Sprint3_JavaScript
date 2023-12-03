import React from 'react';
import'./TableEvent.css'
import { dateFormatDbToView } from '../../../Utils/stringFunctions';

import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'

const TableEvent = ({dados,fnDelete = null, fnUpdate = null}) => {
    return (
        <table className='table-data'>
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Nome</th>
                    <th className="table-data__head-title table-data__head-title--big">Descricao</th>
                    <th className="table-data__head-title table-data__head-title--big">Tipo de Evento</th>
                    <th className="table-data__head-title table-data__head-title--big">Data</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>
             {/* corpo */}
             <tbody>
                {dados.map((event) => {
                    return (
                        <tr className="table-data__head-row" key={event.idEvento}>
                            <td className="table-data__data table-data__data--big">
                                {event.nomeEvento}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {event.descricao}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {event.tiposEvento.titulo}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {dateFormatDbToView(event.dataEvento)}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={editPen} alt="" onClick={() =>fnUpdate(event.idEvento)}/>
                            </td>

                            <td className="table-data__data table-data__data--little"
                            >
                                <img className="table-data__icon" src={trashDelete} alt="" onClick={() =>{fnDelete(event.idEvento)}} idevento = {event.idEvento}/>
                            </td>
                        </tr>
                    )
                })}

            </tbody>


        </table>
    );
};

export default TableEvent;