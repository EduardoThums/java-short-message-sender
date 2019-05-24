import { SignUp } from "../model";
import { api, publicApi } from "./api.service";


export async function signUp(signUp: SignUp) {
    await publicApi.post('register', signUp)
}