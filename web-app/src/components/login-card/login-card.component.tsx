import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom';

import styles from './login-card.module.sass'

import { SFormInput } from '../generics';
import { Login } from '../../model';

interface Props {
    login: (login: Login & { rememberMe: boolean }) => void
}

export function LoginCard({ login }: Props) {

    const [loginForm, setLoginForm] = useState<Login>({ username: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false)

    function handleLoginInputChange({ value, id }: { value: string, id: keyof Login & string }) {
        setLoginForm((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    function handleRememberMeChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target
        const checked = target.checked

        setRememberMe(checked)
    }

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        login({
            ...loginForm,
            rememberMe
        })
    }

    return (
        <div className={styles.loginCard}>
            <span>Message Sender</span>
            <form onSubmit={doLogin}>
                <SFormInput<Login> type="text" id="username" handleChange={handleLoginInputChange} value={loginForm.username} label="Username" />
                <SFormInput<Login> type="password" id="password" handleChange={handleLoginInputChange} value={loginForm.password} label="Password" />
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />

                <input type="submit" value="Login" />

                <Link to="/signup"> Don't have an account? Sign up </Link>
            </form>
        </div>
    )
}