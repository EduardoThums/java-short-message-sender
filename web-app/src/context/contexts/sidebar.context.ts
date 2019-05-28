import { Dispatch, createContext } from "react";
import { SidebarStatus } from "../../model/sidebar.model";
import { SidebarActionTyping } from "../actions/sidebar.actions";

/*
    Context that determines if an sidebar is closed or opened
*/


export type SidebarContextType = [SidebarStatus, Dispatch<SidebarActionTyping>]

export const SIDEBAR_CTX_INITIAL_STATE = SidebarStatus.CLOSED

export const SidebarContext = createContext<SidebarContextType>([
    SIDEBAR_CTX_INITIAL_STATE,
    () => { },
])