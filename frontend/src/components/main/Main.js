import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './Main.css'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Routes from './Routes'
import Footer from '../template/Footer'

export default props =>

    <div className='container d-grid bg-image-gradient '>
        <BrowserRouter>
            <Fragment>
                <Logo />
                <Nav {...props} />
                <Routes />
                <Footer />
            </Fragment>
        </BrowserRouter>
    </div>
