import React from 'react'
import './Box.css'
import url from '../../../assets/img/logo.svg'
import Form from './Form'

export default props => 
    <div className='container d-flex bg-image-gradient'>
        <div className='box'>
            <h1><img src={url} alt='Alien-Space' />Alien-Space - Login</h1>
            <hr />
            <Form {...props} />
        </div>
    </div>