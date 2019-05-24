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
        } catch (error) {
            
        }
        
    }

    return (
        <div className={styles.signUpPage}>
            <SignUpCard signUp={doSignUp}/>
        </div>
    )
}