import { Login } from "../model"
import { publicApi } from "./api.service";

export async function authenticate(login: Login) {
    const response = await publicApi.post<{ token: string }>('login', login)
    return await response.data
}