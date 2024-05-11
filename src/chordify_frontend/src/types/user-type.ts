import { Principal } from "@dfinity/principal"
export type UserType = {
    id: Principal
    username?: string
    imageUrl?: string
}

export interface IUser{
    id: Principal
    username?: string
    imageUrl?: string
}