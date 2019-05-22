import React, { ReactNode, useReducer } from 'react'
import { AlertsContext, INITIAL_STATE } from './contexts/alerts.context'
import { alertsReducer } from './reducers/alerts.reducer'

interface Props {
    children: ReactNode
}

export const GlobalContext = ({ children }: Props) => {

    const [alerts, alertsDispatch] = useReducer(alertsReducer, INITIAL_STATE)

    return (
        <>
            <AlertsContext.Provider value={[alerts, alertsDispatch]}>
                {children}
            </AlertsContext.Provider>
        </>
    )
}