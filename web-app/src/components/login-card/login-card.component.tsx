import React, { useState, ChangeEvent, FormEvent } from 'react'
import styles from './login-card.module.sass'

import { SFormInput } from '../generics/s-input/s-input-form.component';

interface Props {
    login: (login: LoginForm & { rememberMe: boolean }) => void
}

interface LoginForm {
    username: string,
    password: string
}

export function LoginCard({ login }: Props) {

    const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false)

    function handleLoginInputChange({value, id}: { value: string, id: keyof LoginForm & string }) {
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
                <SFormInput<LoginForm> type="text" id="username" handleChange={handleLoginInputChange} value={loginForm.username} label="Username"  />
                <SFormInput<LoginForm> type="password" id="password" handleChange={handleLoginInputChange} value={loginForm.password} label="Password"  />
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange}/>
                
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}