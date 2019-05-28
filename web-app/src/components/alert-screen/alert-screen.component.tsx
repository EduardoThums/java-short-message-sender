import React, { useContext } from 'react'
import { AlertsContext } from '../../context/contexts/alerts.context'
import { AlertComponent } from './alert/alert.component'
import { RemoveAlertAction } from '../../context/actions/alerts.actions'

import styles from './alert-screen.module.sass'

export function AlertScreen() {
    const [{ alerts }, alertDispatch] = useContext(AlertsContext)

    function closeAlert(id: number) {
        alertDispatch(new RemoveAlertAction(id))
    }

    function renderAlerts() {
        return alerts.map((alert,key) => (
            <AlertComponent alert={alert} close={closeAlert} secondsToClose={5} key={key} />
        ))
    }

    return alerts.length ? (<div className={styles.alertScreen}>
        {renderAlerts()}
    </div>) : null
}