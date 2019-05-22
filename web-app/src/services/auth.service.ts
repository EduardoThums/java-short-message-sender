import { Login } from "../model"

export async function authenticate(login: Login) {
    // const response = await api.post<string>('auth', login)
    // return response.data
    return 'token' // TODO : get actual path to api and implement auth
}