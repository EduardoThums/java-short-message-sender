export enum AlertStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    COMMON = 'common'
}

export interface Alert {
    id: number
    text: string
    status: AlertStatus
}