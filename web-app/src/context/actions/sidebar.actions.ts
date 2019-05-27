export enum SidebarActionTypes {
    OPEN = '[sidebar] OPEN',
    CLOSE = '[sidebar] CLOSE'
}

export class OpenSidebarAction {
    public readonly type = SidebarActionTypes.OPEN
}

export class CloseSidebarAction {
    public readonly type = SidebarActionTypes.CLOSE
}

export type SidebarActionTyping = OpenSidebarAction | CloseSidebarAction