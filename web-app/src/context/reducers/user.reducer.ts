import { Reducer } from "react";
import { UserWithID } from "../../model";
import { UserActionTyping, UserActionTypes } from "../actions/user.actions";
import { USER_CTX_INITIAL_STATE } from "../contexts/user.context";


export const userReducer: Reducer<UserWithID | null, UserActionTyping> = (state = USER_CTX_INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.AUTH:
            return action.user
        case UserActionTypes.LOGOUT:
            return null
        default:
            return state
    }
}