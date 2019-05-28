import { createContext, Dispatch } from "react"
import { AlertActionTyping } from "../actions/alerts.actions"
import { Alert } from "../../model"


export interface Alerts {
    id: number
    alerts: Alert[]
}

type AlertsContextType = [Alerts, Dispatch<AlertActionTyping>]


export const ALERTS_CTX_INITIAL_STATE = {
    id: 0,
    alerts: []
}

export const AlertsContext = createContext<AlertsContextType>([ALERTS_CTX_INITIAL_STATE, () => { }])