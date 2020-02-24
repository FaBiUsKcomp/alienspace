import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

import Session from '../utils/Session'

export default props => 
    <nav className='nav'>
        <Session {...props} />
        <Link to='/'><i className="fa fa-home"></i> Início</Link>
        <Link to='/tasks'><i className="fa fa-tasks"></i> Tarefas</Link>
        <Link to='/money'><i className='fa fa-money'></i> Dinheiro</Link>
        {/*<Link to='/users'><i className="fa fa-users"></i> Usuários</Link>*/}
    </nav>