import { MessageToSend, MessageReceived } from "../model/message.model";
import { api } from "./api.service";
import { Paged } from "../model";


export async function sendMessage(message: MessageToSend) {
    const response = await api.post<{}>('/message/send', message)
    return response.data
}

export async function findReceivedMessages(page: number) {
    const response = await api.get<Paged<MessageReceived>>(`/message/find-all/received?page=${page}`)
    return response.data
}
