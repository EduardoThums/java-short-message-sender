import React from 'react'

import styles from './sign-up.module.sass'
import { SignUpCard } from '../../components';

export function SignUpPage() {

    

    return (
        <div className={styles.signUpPage}>
            <SignUpCard signUp={() => {}}/>
        </div>
    )
}