import React from 'react'
import { Route, Redirect } from 'react-router';
import { isAuthenticated }from './config/auth'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route { ...rest } render={props => (
            isAuthenticated() && restricted ? 
                control() 
            : <Component {...props} />
        )} />
    );
}

const control = () => {
    alert('Faça Logout')
    return <Redirect to='/home' /> 
}

export default PublicRoute