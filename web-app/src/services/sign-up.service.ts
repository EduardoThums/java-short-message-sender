import { SignUp } from "../model";
import { publicApi } from "./api.service";


export async function signUp(signUp: SignUp) {
    await publicApi.post('register', signUp)
}