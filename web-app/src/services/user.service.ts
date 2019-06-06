import { api } from "./api.service";
import { UserWithID, Paged } from "../model";

export const userService = {
    getPagedUsersByUsername: async ({ page, username }: { page: number, username: string }) => {
        const response = await api.get<Paged<UserWithID>>(`/user/find-by-username/autocomplete/${username}?page=${page}`)
        return response.data
    },
    getUsersByPage: async (page: number) => {
        const response = await api.get<Paged<UserWithID>>(`/user?page=${page}`)
        return response.data
    },
    getAuthUser: async () => {
        const response = await api.get<UserWithID>('/user/find-logged-user')
        return response.data
    }
}