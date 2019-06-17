import React, { FormEvent, useState } from 'react'

import styles from './sign-up-card.module.sass'

import { SignUpForm } from '../../model';
import { SFormInput } from '../generics';
import { Link } from 'react-router-dom';
import { MSBlueIcon } from '../../resources';

interface Props {
    signUp(signUp: SignUpForm): void
}

export function SignUpCard({ signUp }: Props) {

    const [signUpForm, setSignUpForm] = useState<SignUpForm>({
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
            <MSBlueIcon className={styles.logo} />

            <form onSubmit={doSignUp}>

                <SFormInput<SignUpForm> type='text' id='username' label="Nome de Usuario" handleChange={handleFormChange} value={signUpForm.username} />
                <SFormInput<SignUpForm> type='password' id='password' label="Senha" handleChange={handleFormChange} value={signUpForm.password} />
                <SFormInput<SignUpForm> type='password' id='repeatPassword' label="Confirme a Senha" handleChange={handleFormChange} value={signUpForm.repeatPassword} />
                <SFormInput<SignUpForm> type='text' id='imageUrl' label="URL da sua imagem" handleChange={handleFormChange} value={signUpForm.imageUrl} />

                <div className={styles.buttons}>
                    <button > Cadastrar </button>
                    <Link to="/"> Ja possui conta? Entre </Link>
                </div>
            </form>
        </div>
    )
}