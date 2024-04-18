import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MusicType } from "../../types/music-type"
import { useLoading } from "../../contexts/loading-context"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import { Principal } from "@dfinity/principal"
import { toast } from "react-toastify"

export default function MusicDetail() {

    const { id } = useParams()
    const { setIsLoading } = useLoading()
    const [music, setMusic] = useState<MusicType>()

    const fetch = async () => {
        try {
            setIsLoading(true)
            const res = await chordify_backend.getMusicById(Principal.fromText(id!))
            if ('Ok' in res) {
                const data = res.Ok
                const musicRes: MusicType = {
                    id: data.id,
                    author: data.author,
                    name: data.name,
                    description: data.description,
                    genres: data.genres,
                    imageUrl: data.imageUrl,
                    price: Number(data.price),
                    supply: Number(data.supply),
                    volume: Number(data.volume)
                }
                setMusic(musicRes)
            }
        } catch (error) {
            toast.error("Failed to get music")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [])


    return (
        <>
            <h1>{music?.name}</h1>
        </>
    )
}