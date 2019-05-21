import { Login } from "../model";
import { api } from "./api.service";

export async function authenticate(login: Login) {
    const response = await api.post<string>('auth', login)
    return response.data
}