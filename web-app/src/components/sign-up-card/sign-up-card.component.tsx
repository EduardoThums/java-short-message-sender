import React, { FormEvent, useState } from 'react'

import styles from './sign-up-card.module.sass'

import { SignUpForm } from '../../model';
import { SFormInput } from '../generics';
import { Link } from 'react-router-dom';

interface Props {
    signUp(signUp: SignUpForm): void
}

export function SignUpCard({ signUp }: Props) {

    const [ signUpForm, setSignUpForm ] = useState<SignUpForm>({
        username: '',
        password: '',
        repeatPassword: '',
        imageUrl: ''
    })

    function doSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        signUp(signUpForm)
    }

    function handleFormChange({ id, value }: { id: keyof SignUpForm & string, value: string }) {
        setSignUpForm((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    return ( 
        <div className={styles.signUpCard}>
            <span className={styles.title}> MESSAGE SENDER </span>

            <span className={styles.subtitle}> Sign Up </span>

            <form onSubmit={doSignUp}>
            
                <SFormInput<SignUpForm> type='text' id='username' label="Username" handleChange={handleFormChange} value={signUpForm.username} />
                <SFormInput<SignUpForm> type='password' id='password' label="Password" handleChange={handleFormChange} value={signUpForm.password} />
                <SFormInput<SignUpForm> type='password' id='repeatPassword' label="Confirm Password" handleChange={handleFormChange} value={signUpForm.repeatPassword} />
                <SFormInput<SignUpForm> type='text' id='imageUrl' label="Your image's URL" handleChange={handleFormChange} value={signUpForm.imageUrl} />

                <div className={styles.buttons}>
                    <button > Sign Up </button>
                    <Link to="/"> Sign In </Link>
                </div>
            </form>
        </div>
    )
}