import { MessageToSend, MessageReceived } from "../model/message.model";
import { api } from "./api.service";
import { Paged, MessageFilter } from "../model";



export const messageService = {

    markMessageAsRead: async (id: number) => {
        const response = await api.put<{}>(`/message/mark-as-read/${id}`)
        return response.data
    },
    findMessageById: async (id: number) => {
        const response = await api.get<MessageReceived>(`/message/find-by-id/${id}`)
        return response.data
    },
    findReceivedMessages: async (page: number, filter: MessageFilter) => {
        const response = await api.get<Paged<MessageReceived>>(`/message/find-all/received?page=${page}${filter.username ? `&username=${filter.username}` : ''}${filter.subject ? `&subject=${filter.subject}` : ''}`)
        return response.data
    },
    sendMessage: async (message: MessageToSend) => {
        const response = await api.post<{}>('/message/send', message)
        return response.data
    }

}
