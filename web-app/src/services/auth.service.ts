import { Login } from "../model"
import { publicApi } from "./api.service";

export const authService = {
    authenticate: async (login: Login) => {
        const response = await publicApi.post<{ token: string }>('login', login)
        return await response.data
    }
}