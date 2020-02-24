import React from 'react'
import './Logo.css'
import url from '../../assets/img/logo.svg'

export default props => 
    <header className='logo'>
        <img src={url} alt='Logo'></img>
        <a href='/'><h1>Alien-Space</h1></a>
    </header>
    