import { SignUp } from "../model";
import { publicApi } from "./api.service";

export const signUpService = {
    signUp: async (signUp: SignUp) => {
        await publicApi.post('register', signUp)
    }
}