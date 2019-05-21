import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './login/login.route';

export function MainRouting() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}