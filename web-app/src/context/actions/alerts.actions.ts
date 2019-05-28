import { AlertStatus } from "../../model"

export enum AlertsActionTypes {
    ADD = "[alerts] ADD",
    REMOVE = "[alerts] REMOVE"
}

export class AddAlertAction {
    readonly type = AlertsActionTypes.ADD

    constructor(public readonly alert: { text: string, status: AlertStatus }) { }
}

export class RemoveAlertAction {
    readonly type = AlertsActionTypes.REMOVE

    constructor(public readonly id: number) { }
}

export type AlertActionTyping = AddAlertAction | RemoveAlertAction