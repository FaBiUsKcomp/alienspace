import React, { useState } from 'react'
import '../template/Box.css'
import '../template/Form.css'
import url from '../../../assets/img/logo.svg'

import axios from '../../../config/axios'

export default function Resgiter({ history }) {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confsenha, setConfSenha] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        history.push('/login')
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if(!nome || !email || !senha || !confsenha) alert('Preencha todos os campos!')

        if(senha !== confsenha) alert('As senhas não coincidem!')

        const data = { nome, email, senha, confsenha }

        axios.post('/users', data)
            .then(data => {
                if(data.status === 204) {
                    alert('Cadastrado com Sucesso! Faça Login!')
                    history.push('/login')
                }
            }).catch(err => alert('Falha no Cadastro!'))
    }

    return(
        <div className='container d-flex bg-image-gradient'>
            <div className='box'>
                <h1><img src={url} alt='Alien-Space' />Alien-Space - Resgistro</h1>
                <hr />
                <form className='form' name='register' onSubmit={handleRegister}>
                    <div className='form-row'>
                        <label>
                            Usuário <i className='fa fa-user'></i>
                        </label>
                        <input value={nome} onChange={e => setNome(e.target.value)} type='text' placeholder='Nome de Usuário...'></input>
                    </div>
                    <div className='form-row'>
                        <label>
                            Email <i className='fa fa-envelope'></i>
                        </label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email...'></input>
                    </div>
                    <div className='form-row'>
                        <label>
                            Senha <i className='fa fa-key'></i>
                        </label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type='password' placeholder='**********'></input>
                    </div>
                    <div className='form-row'>
                        <label>
                            Confirmar Senha <i className='fa fa-key'></i>
                        </label>
                        <input value={confsenha} onChange={e => setConfSenha(e.target.value)} type='password' placeholder='**********'></input>
                    </div>
                    <div className='rowBtn'>
                        <button onClick={handleLogin} className='cad' type='button'>Já tenho Conta</button>
                        <button className='send' type='submit'>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}