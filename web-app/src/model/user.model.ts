export interface User {
    username: string
    imageUrl: string
}

export interface UserWithID extends User {
    id: number
}