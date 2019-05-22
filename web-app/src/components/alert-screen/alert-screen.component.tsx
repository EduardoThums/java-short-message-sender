import React, { useContext } from 'react'
import { AlertsContext } from '../../context/contexts/alerts.context'
import { Alert } from './alert/alert.component'
import { RemoveAlertAction } from '../../context/actions/alerts.actions'

export function AlertScreen() {
    const [{ alerts }, alertDispatch] = useContext(AlertsContext)

    function closeAlert(id: number) {
        alertDispatch(new RemoveAlertAction(id))
    }

    function renderAlerts() {
        return alerts.map((alert) => (
            <Alert alert={alert} close={closeAlert} />
        ))
    }

    return <div>

    </div>
}