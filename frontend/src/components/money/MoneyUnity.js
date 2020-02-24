import React from  'react'

export default props =>
    <div className='money-unity'>
        <div className={props.status ? `money-unity-container ${props.status}`: `money-unity-container`}>
            <p>{props.local}</p>
            <p><b>Valor:</b> {`R$ ${props.valor}`}</p>
            <p><b>Mes:</b> {props.mes}</p>
            <p><b>Ano:</b> {props.ano}</p>
            <p><b>Status:</b> {props.tipo}</p>
        </div>
    </div>
