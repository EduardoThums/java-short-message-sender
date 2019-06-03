import { api } from "./api.service";
import { UserWithID, Paged } from "../model";
import { storageKeys } from "../utils";
import { async } from "q";


export async function getAuthUser() {
    const response = await api.get<UserWithID>('/user/find-logged-user')
    return response.data
}

export async function getUsersByPage(page: number) {
    const response = await api.get<Paged<UserWithID>>(`/user?page=${page}`)
    return response.data
}

export async function getPagedUsersByUsername({ page, username }: { page: number, username: string }) {
    const response = await api.get<Paged<UserWithID>>(`/user/find-by-username/${username}?page=${page}`)
    return response.data
}
