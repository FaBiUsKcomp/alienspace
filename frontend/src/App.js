import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import Routes from './Routes'

export default props =>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
