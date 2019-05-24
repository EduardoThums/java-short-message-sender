import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginPage } from './login/login.route'
import { SignUpPage } from './sign-up/sign-up.route';

export function MainRouting() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={LoginPage} exact />
                <Route path="/sign-up" component={SignUpPage} exact />
                <Route />
            </Switch>
        </BrowserRouter>
    )
}