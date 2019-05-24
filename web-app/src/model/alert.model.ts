export enum AlertStatus {
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    COMMON = 'common'
}

export interface Alert {
    id: number
    text: string
    status: AlertStatus
}