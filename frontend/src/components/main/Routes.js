import React from 'react'
import { Switch, Route, Redirect } from 'react-router' //Não especifica se estamos na DOM ou no MOBILE
import Home from '../home/Home'
import Task from '../tasks/Tasks'
import Money from '../money/Money'

export default props =>
    <Switch>
        <Route exact path='/home' component={Home} />
        <Route path='/tasks' component={Task} />
        <Route path='/money' component={Money} />
        {/*<Route path='/users' component={Users} />*/}
        <Redirect from='*' to='/home' />
    </Switch>