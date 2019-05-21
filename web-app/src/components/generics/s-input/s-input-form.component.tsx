import React, { ChangeEvent } from 'react'
import styles from './s-input.module.sass'

interface Props<F> {
    id: keyof F & string
    handleChange: (input: { value: string, id: keyof F & string }) => void
    value: string
    type: "email" | "password" | "text"
    className?: string
    label?: string
}

export function SFormInput<F>({ handleChange, id, value, className, label, type }: Props<F>) {

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target
        const value = target.value
        const id = target.id as keyof F & string

        handleChange({
            value,
            id
        })
    }

    function renderLabel() {
        return label ? (
            <label htmlFor={id}>{label}</label>
        ) : null
    }

    return (
        <div className={`${styles.sInput} ${className}`}>
            <input type={type} onChange={handleInputChange} id={id} value={value} />
            {renderLabel()}
        </div>
    )
}

