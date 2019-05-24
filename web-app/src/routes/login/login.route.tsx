import React, { useContext } from 'react'
import styles from './login.module.sass'

import { LoginCard } from '../../components'
import { authenticate } from '../../services/auth.service'
import { Login, AlertStatus } from '../../model'
import { AlertsContext } from '../../context/contexts/alerts.context';
import { AddAlertAction } from '../../context/actions/alerts.actions';
import { storageKeys } from '../../utils';

export function LoginPage() {

    const [, alertDispatch] = useContext(AlertsContext)

    async function login({ username, password, rememberMe }: Login & { rememberMe: boolean }) {

        if (!username || !password) {
            alertDispatch(new AddAlertAction({
                text: "Não deixe campos em branco",
                status: AlertStatus.DANGER
            }))
            return
        }

        try {
            const { token } = await authenticate({
                username,
                password
            })

            rememberMe ?
                localStorage.setItem(storageKeys.token, token) :
                sessionStorage.setItem(storageKeys.token, token)
        } catch (error) {

        }

    }

    return (
        <div className={styles.loginPage}>
            <LoginCard login={login} />
        </div>
    )
}