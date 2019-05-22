import { INITIAL_STATE, Alerts } from '../contexts/alerts.context'
import { AlertsActionTypes, AlertActionTypings } from '../actions/alerts.actions'
import { Reducer } from 'react'

export const alertsReducer: Reducer<Alerts, AlertActionTypings> = (state: Alerts = INITIAL_STATE, action: AlertActionTypings) => {
    switch (action.type) {
        case AlertsActionTypes.ADD_ALERT:
            return {
                id: state.id + 1,
                alerts: [
                    ...state.alerts,
                    { id: state.id + 1, ...action.alert }
                ]
            }
        case AlertsActionTypes.REMOVE_ALERT:
            const filteredMessages = state.alerts.filter(m => m.id !== action.id)

            return {
                ...state,
                alerts: filteredMessages
            }
        default:
            return state
    }
}