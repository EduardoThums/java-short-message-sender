import { UserWithID } from "../../model";

export enum UserActionTypes {
    AUTH = '[user] AUTH',
    LOGOUT = '[user] LOGOUT'
}

export class AuthUserAction {
    public readonly type = UserActionTypes.AUTH

    constructor(readonly user: UserWithID) {}
}

export class LogoutUserAction {
    public readonly type = UserActionTypes.LOGOUT
}

export type UserActionTyping = AuthUserAction | LogoutUserAction