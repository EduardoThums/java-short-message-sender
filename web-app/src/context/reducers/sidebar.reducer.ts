import { Reducer } from "react";
import { SidebarStatus } from "../../model/sidebar.model";
import { SidebarActionTyping, SidebarActionTypes } from "../actions/sidebar.actions";


export const sidebarReducer: Reducer<SidebarStatus, SidebarActionTyping> = (state = SidebarStatus.CLOSED, action) => {
    switch (action.type) {
        case SidebarActionTypes.OPEN:
            return SidebarStatus.OPEN
        case SidebarActionTypes.CLOSE:
            return SidebarStatus.CLOSED
        default:
            return state
    }
} 