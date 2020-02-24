import React, { useState } from 'react'
import './Form.css'
import Contact from '../../utils/Contact'
import axios from '../../../config/axios'

export default function Form({ history }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        if(!email || !senha) return 

        const data = { email, senha }

        const resultRequest = await axios.post('/login', data)

        if(resultRequest.status === 200) {
            const dataUserLogged = {
                id: resultRequest.data.id,
                nome: resultRequest.data.nome,
                email: resultRequest.data.email,
                iat: resultRequest.data.iat,
                exp: resultRequest.data.exp,
                token: resultRequest.data.token
            }
            handleSession(dataUserLogged)
        }
    }

    function handleSession(dataUserLogged) {
        if(dataUserLogged){
            localStorage.setItem('@user_id', dataUserLogged.id)
            localStorage.setItem('@nome', dataUserLogged.nome)
            localStorage.setItem('@email', dataUserLogged.email)
            localStorage.setItem('@iat', dataUserLogged.iat)
            localStorage.setItem('@exp', dataUserLogged.exp)
            localStorage.setItem('@token', dataUserLogged.token)
            history.push('/home')
        } else {
            history.push('/login')
        }
    }

    function handleRegister() {
        history.push('/register')
    }

    return(
        <form className='form' onSubmit={handleLogin}>
            <div className='form-row'>
                <label>
                    Usuário <i className='fa fa-user'></i>
                </label>
                <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Nome de Usuário...'></input>
            </div>
            <div className='form-row'>
                <label>
                    Senha <i className='fa fa-key'></i>
                </label>
                <input value={senha} onChange={e => setSenha(e.target.value)} type='password' placeholder='**********'></input>
            </div>
            <div className='rowBtn'>
                <button onClick={handleRegister} className='cad' type='button'>Cadastrar</button>
                <button className='send' type='submit'>Enviar</button>
            </div>

            <hr/>
            <Contact />
        </form>
    )
}