import React, { useContext } from 'react'
import styles from './login.module.sass'

import { LoginCard } from '../../components'
import { authenticate } from '../../services/auth.service'
import { Login, AlertStatus } from '../../model'
import { AlertsContext } from '../../context/contexts/alerts.context';
import { AddAlertAction } from '../../context/actions/alerts.actions';

export function LoginPage() {

    const [, alertDispatch] = useContext(AlertsContext)

    async function login({ username, password, rememberMe }: Login & { rememberMe: boolean }) {

        if (!username || !password) {
            alertDispatch(new AddAlertAction({
                text: "You can't leave empty fields",
                status: AlertStatus.DANGER
            }))
        }

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