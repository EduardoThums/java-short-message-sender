export enum SidebarStatus {
    OPEN = 'open',
    CLOSED = 'closed',
}

export interface SidebarLink {
    to: string
    name: string
    actual: boolean
}