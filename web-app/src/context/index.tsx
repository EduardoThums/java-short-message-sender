import React, { ReactNode, useReducer } from 'react'
import { AlertsContext, ALERTS_CTX_INITIAL_STATE } from './contexts/alerts.context'
import { alertsReducer } from './reducers/alerts.reducer'
import { sidebarReducer } from './reducers/sidebar.reducer';
import { SIDEBAR_CTX_INITIAL_STATE, SidebarContext } from './contexts/sidebar.context';
import { UserContext, USER_CTX_INITIAL_STATE } from './contexts/user.context';
import { userReducer } from './reducers/user.reducer';

interface Props {
    children: ReactNode
}

export const GlobalContext = ({ children }: Props) => {

    const [alerts, alertsDispatch] = useReducer(alertsReducer, ALERTS_CTX_INITIAL_STATE)
    const [sidebarStatus, sidebarDispatch] = useReducer(sidebarReducer, SIDEBAR_CTX_INITIAL_STATE)
    const [user, userDispatch] = useReducer(userReducer, USER_CTX_INITIAL_STATE)

    return (
        <>
            <AlertsContext.Provider value={[alerts, alertsDispatch]}>
            <SidebarContext.Provider value={[sidebarStatus, sidebarDispatch]}>
            <UserContext.Provider value={[user,userDispatch]}>

                {children}
                
            </UserContext.Provider>
            </SidebarContext.Provider>
            </AlertsContext.Provider>
        </>
    )
}