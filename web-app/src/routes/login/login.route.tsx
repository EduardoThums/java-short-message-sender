import React from 'react'
import styles from './login.module.sass'

import { LoginCard } from '../../components/login-card/login-card.component'

export function Login() {

    return (
        <div className={styles.loginPage}>
            <LoginCard login={(e) => {}} />
        </div>
    )
}