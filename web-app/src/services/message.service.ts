import { MessageToSend } from "../model/message.model";
import { api } from "./api.service";


export async function sendMessage(message: MessageToSend) {
    const response = await api.post<{}>('/message/send', message)
    return response.data
}
