import React, { useContext } from 'react'

import styles from './sign-up.module.sass'
import { SignUpCard } from '../../components';
import { SignUpForm, AlertStatus } from '../../model';
import { AlertsContext } from '../../context/contexts/alerts.context';
import { AddAlertAction } from '../../context/actions/alerts.actions';
import { signUp } from '../../services';

export function SignUpPage() {

    const [, alertDispatch] = useContext(AlertsContext)

    async function doSignUp({ username, password, repeatPassword, imageUrl }: SignUpForm) {

        if (!username || !password) {
            alertDispatch(new AddAlertAction({
                text: "Não deixe nome de usuario ou senha em branco",
                status: AlertStatus.DANGER
            }))
            return
        }

        if(password !== repeatPassword) {
            alertDispatch(new AddAlertAction({
                text: 'Senhas não correspondem',
                status: AlertStatus.DANGER
            }))
            return
        }

        try {
            await signUp({
                username,
                password,
                imageUrl
            })

            alertDispatch(new AddAlertAction({
                text: 'Conta criada com sucesso',
                status: AlertStatus.SUCCESS
            }))
        } catch (error) {
            const errorMessage = error.response.data.message
            alertDispatch(new AddAlertAction({
                text: errorMessage,
                status: AlertStatus.DANGER
            }))
        }
        
    }

    return (
        <div className={styles.signUpPage}>
            <SignUpCard signUp={doSignUp}/>
        </div>
    )
}