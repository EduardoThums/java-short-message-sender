import { UserWithID } from "../../model";
import { createContext, Dispatch } from "react";
import { UserActionTyping } from "../actions/user.actions";


export type UserContextType = [UserWithID | null, Dispatch<UserActionTyping>]

export const USER_CTX_INITIAL_STATE = null

export const UserContext = createContext<UserContextType>([null, () => {}])