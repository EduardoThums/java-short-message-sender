import { UserWithID } from "./user.model";

export interface MessageToSend {
    receiverId: number
    text: string
    subject: string
}

export interface MessageReceived {
    id: number
    text: string
    isRead: boolean
    subject: string
    createdDate: string
    sender: UserWithID
}