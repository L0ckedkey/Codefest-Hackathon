import { Principal } from "@dfinity/principal"

export type MusicType = {
    id: Principal
    name: string
    description: string
    genres: []
    imageUrl: string
    supply: number
    price: number
    volume: number
    authorId: Principal
}