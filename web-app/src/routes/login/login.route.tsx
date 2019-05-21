import React from 'react'
import styles from './login.module.sass'

import { LoginCard } from '../../components'
import { authenticate } from '../../services/auth.service';
import { Login } from '../../model';

export function LoginPage() {

    async function login({ username, password, rememberMe }: Login & { rememberMe: boolean }) {

        const token = await authenticate({
            username,
            password
        })

        const tokenKey = 'accessToken'

        rememberMe ?
            localStorage.setItem(tokenKey, token) :
            sessionStorage.setItem(tokenKey, token)

    }

    return (
        <div className={styles.loginPage}>
            <LoginCard login={login} />
        </div>
    )
}