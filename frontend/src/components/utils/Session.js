import React from 'react'
import './Session.css'

export default function Session({ history }) {

    function handleLogout(e) {
        e.preventDefault()

        localStorage.clear()

        history.push('/login')
    }
    

    function getUserName () {
        return localStorage.getItem('@nome')
    }

    return(
        <div className='session'>
            <div className='profile'>

            </div>
            <p>{getUserName()}</p>
            <button onClick={handleLogout} type='button'>Sair</button>
        </div>
    )
}