import React from 'react'
import Login from './components/login/template/Box'
import Register from './components/login/register/Register'
import Main from './components/main/Main'

import { Switch, Redirect } from 'react-router'
import PrivateRoute from'./PrivateRoute'
import PublicRoute from './PublicRoute'

export default props =>
    <Switch>
        <PublicRoute restricted={true} path='/login' component={Login} exact />
        <PublicRoute restricted={true} path='/register' component={Register} exact />
        <PrivateRoute path='/home' component={Main} exact />
        <Redirect from='*' to='/home' />
    </Switch>
