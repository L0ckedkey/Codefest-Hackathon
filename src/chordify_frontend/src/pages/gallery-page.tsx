import { useEffect, useState } from "react"
import { chordify_backend } from "../../../declarations/chordify_backend"
import { MusicType } from "../types/music-type"
import { useLoading } from "../contexts/loading-context"

export default function Gallery() {

    const [musics, setMusics] = useState<MusicType[]>([])
    const { isLoading, setIsLoading } = useLoading()

    const fetchMusics = async () => {
        try {
            setIsLoading(true)
            const res = await chordify_backend.getMusicByVolumeDesc({ limit: BigInt(50) })
            if ('Ok' in res) {
                const musicData = res.Ok.map((music) => ({
                    id: music.id,
                    author: music.author,
                    name: music.name,
                    description: music.description,
                    volume: Number(music.volume),
                    imageUrl: music.imageUrl,
                    price: Number(music.price),
                    supply: Number(music.supply),
                    genres: music.genres,
                    saleEnd: Number(music.saleEnd)
                }))
                
                setMusics(musicData)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }


    useEffect(() => {
        fetchMusics()
    }, [])
    if (isLoading) {
        return
    }

    return (
        <>
            <div className="w-full h-full flex mt-20 p-10 box-border ">
                <div className="min-h-full h-full w-full columns-2 md:columns-3 lg:columns-4 gap-x-6 ">
                    {
                        musics && musics.map((music, index) => (
                            <a href={`/music/${music!.id}`} key={index} className="w-full break-inside-avoid ">
                                <img className="max-w-full rounded-md mb-3 " loading="lazy" src={music.imageUrl} alt="" />
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
}