import { AlertStatus } from "../../model"

export enum AlertsActionTypes {
    ADD_ALERT = "[alerts] ADD_ALERT",
    REMOVE_ALERT = "[alerts] REMOVE_ALERT"
}

export class AddAlertAction {
    readonly type = AlertsActionTypes.ADD_ALERT

    constructor(public readonly alert: { text: string, status: AlertStatus }) { }
}

export class RemoveAlertAction {
    readonly type = AlertsActionTypes.REMOVE_ALERT

    constructor(public readonly id: number) { }
}

export type AlertActionTypings = AddAlertAction | RemoveAlertAction