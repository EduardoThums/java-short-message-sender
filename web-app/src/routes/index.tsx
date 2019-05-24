import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginPage } from './login/login.route'

export function MainRouting() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={LoginPage} exact />
                <Route />
            </Switch>
        </BrowserRouter>
    )
}