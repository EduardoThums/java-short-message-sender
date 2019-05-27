import React, { ReactNode, useReducer } from 'react'
import { AlertsContext, ALERTS_CTX_INITIAL_STATE } from './contexts/alerts.context'
import { alertsReducer } from './reducers/alerts.reducer'
import { sidebarReducer } from './reducers/sidebar.reducer';
import { SIDEBAR_CTX_INITIAL_STATE, SidebarContext } from './contexts/sidebar.context';

interface Props {
    children: ReactNode
}

export const GlobalContext = ({ children }: Props) => {

    const [alerts, alertsDispatch] = useReducer(alertsReducer, ALERTS_CTX_INITIAL_STATE)
    const [sidebarStatus, sidebarDispatch] = useReducer(sidebarReducer, SIDEBAR_CTX_INITIAL_STATE)

    return (
        <>
            <AlertsContext.Provider value={[alerts, alertsDispatch]}>
                <SidebarContext.Provider value={[sidebarStatus, sidebarDispatch]}>
                    {children}
                </SidebarContext.Provider>
            </AlertsContext.Provider>
        </>
    )
}