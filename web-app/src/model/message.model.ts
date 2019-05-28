import { UserWithID } from "./user.model";

export interface MessageToSend {
    receiver: UserWithID
    text: string
}

export interface MessageDTO {

}