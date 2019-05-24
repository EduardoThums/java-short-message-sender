export interface SignUp {
    username: string
    password: string
    imageUrl: string
}

export interface SignUpForm extends SignUp {
    repeatPassword: string
}