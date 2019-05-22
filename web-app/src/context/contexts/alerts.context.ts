import { createContext, Dispatch } from "react"
import { AlertActionTypings } from "../actions/alerts.actions"
import { Alert } from "../../model"


export interface Alerts {
    id: number
    alerts: Alert[]
}

type AlertsContextType = [Alerts, Dispatch<AlertActionTypings>]


export const INITIAL_STATE = {
    id: 0,
    alerts: []
}

export const AlertsContext = createContext<AlertsContextType>([INITIAL_STATE, () => { }])