import { Principal } from "@dfinity/principal"
import { UserType } from "./user-type"

export type MusicType = {
    id: Principal
    name: string
    description: string
    genres: string[]
    imageUrl: string
    supply: number
    price: number
    volume: number
    author: UserType
}