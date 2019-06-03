import React, { ChangeEvent } from 'react'
import styles from './s-input.module.sass'

interface Props {
    id: string
    handleChange: (input: { value: string, id: string }) => void
    value: string
    type: "email" | "password" | "text"
    className?: string
    label?: string
    placeholder?: string
    inputOptionalProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export function SInput({ handleChange, id, value, className, label, type, placeholder, inputOptionalProps }: Props) {

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target
        const value = target.value
        const id = target.id

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
        <div className={`${styles.sInput} ${className || ''}`}>
            <input placeholder={placeholder} type={type} onChange={handleInputChange} id={id} value={value} {...inputOptionalProps} />
            {renderLabel()}
        </div>
    )
}

