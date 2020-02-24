import React from 'react'
import Content from '../template/Content'
import './Home.css'

export default props =>
    <Content>
        <div className='home'>
            
            <div className='d-flex introducion'>
                <h2><i className="fa fa-reddit-alien" aria-hidden="true"></i> Bem-Vindo ao Alien-Space!</h2>
                <hr/>

                <div className='introducion-text'>
                    <p>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Um sistema inicialmente 
                        desenvolvido com o intuito de aplicar conceitos adquiridos durante estudos
                        realizados com as ferramentas ReactJS e NodeJS.
                    </p>
                </div>

            </div>

            <div className='d-flex introducion mt-3'>
                <h3><i className="fa fa-star" aria-hidden="true"></i> Funcionalidades:</h3>

                <div className='introducio-text p-4'>
                    <ul>
                        <li>Controle de Tarefas a serem realizadas.</li>
                        <li>Administração de gastos e fundos.</li>
                    </ul>
                </div>
            </div>
            
        </div>
    </Content>