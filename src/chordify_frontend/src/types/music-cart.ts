import { Principal } from "@dfinity/principal"
import { UserType } from "./user-type"

export type MusicCart = {
    id: Principal
    musicId: Principal
    name: string
    genres: string[]
    imageUrl: string
    author: UserType
    quantity: number,
    price: number
}