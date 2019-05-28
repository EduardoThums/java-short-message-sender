import { ALERTS_CTX_INITIAL_STATE, Alerts } from '../contexts/alerts.context'
import { AlertsActionTypes, AlertActionTyping } from '../actions/alerts.actions'
import { Reducer } from 'react'

export const alertsReducer: Reducer<Alerts, AlertActionTyping> = (state = ALERTS_CTX_INITIAL_STATE, action) => {
    switch (action.type) {
        case AlertsActionTypes.ADD:
            return {
                id: state.id + 1,
                alerts: [
                    ...state.alerts,
                    { id: state.id + 1, ...action.alert }
                ]
            }
        case AlertsActionTypes.REMOVE:
            const filteredMessages = state.alerts.filter(m => m.id !== action.id)

            return {
                ...state,
                alerts: filteredMessages
            }
        default:
            return state
    }
}