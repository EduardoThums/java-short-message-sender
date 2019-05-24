import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { LoginPage } from './login/login.route'
import { SignUpPage } from './sign-up/sign-up.route';
import { HomePage } from './home/home.route';

export function MainRouting() {
    return (
        <BrowserRouter>
            <Route path="/" component={LoginPage} exact />
            <Route path="/sign-up" component={SignUpPage} exact />
            <Route path="/home" component={HomePage}/>
        </BrowserRouter>
    )
}