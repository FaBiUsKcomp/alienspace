import React from 'react'
import './Footer.css'
import Contact from '../utils/Contact'

function footer (props) {
    return (
        <footer className='footer'>
            <span><i className='fa fa-code'></i> por <b>FaBiUsKcomp</b></span>
            <Contact />
        </footer>
    )
}

export default footer