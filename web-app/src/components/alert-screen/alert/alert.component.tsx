import React from 'react'
import { Alert, AlertStatus } from '../../../model'
import { SuccessIcon, ErrorIcon, WarningIcon, CloseIcon } from '../../../resources';

import styles from './alert.module.sass'

interface Props {
    alert: Alert
    secondsToClose: number

    close(id: number): void
}

export function AlertComponent({ close, alert, secondsToClose }: Props) {


    const timeToClose = 1000 * secondsToClose // seconds to close in milliseconds

    const timer = setTimeout(() => {
        close(alert.id)
    }, timeToClose)

    function renderIcon() {
        switch (alert.status) {
            case AlertStatus.SUCCESS:
                return (
                    <SuccessIcon className={`${styles.symbol} ${styles[alert.status]}`} />
                )
            case AlertStatus.DANGER:
                return (
                    <ErrorIcon className={`${styles.symbol} ${styles[alert.status]}`} />
                )
            case AlertStatus.WARNING:
                return (
                    <WarningIcon className={`${styles.symbol} ${styles[alert.status]}`} />
                )
        }
    }

    function closeAlert() {
        clearTimeout(timer)
        close(alert.id)
    }


    return (
        <div className={styles.alertCard}>
            <header>
                {renderIcon()}
                <button className={styles.alertButton} onClick={closeAlert}>
                    <CloseIcon />
                </button>
            </header>
            <span className={`${styles.message} ${styles[alert.status]}`}>
                {alert.text}
            </span>
        </div>

    )
}
