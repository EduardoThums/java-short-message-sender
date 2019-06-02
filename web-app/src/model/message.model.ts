import { UserWithID } from "./user.model";

export interface MessageToSend {
    receiverId: number
    text: string
}

export interface MessageReceived {
    id: number
    text: string
    isRead: boolean
    createdDate: string
    sender: UserWithID
}