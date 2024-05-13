import { useEffect, useState } from "react"
import { MusicType } from "../../types/music-type"
import { useLoading } from "../../contexts/loading-context"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import DiscoverCard from "./discover-card"

export default function DiscoverSection() {
    const [musics, setMusics] = useState<MusicType[]>([])
    const { isLoading, setIsLoading } = useLoading()

    const fetchMusics = async () => {
        try {
            setIsLoading(true)
            const res = await chordify_backend.getMusics()
            const musicData = res.map((music) => ({
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
            // if ('Ok' in res) {
            // }
            
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }


    useEffect(() => {
        fetchMusics()
    }, [])
    return (
        <>
            {
                musics.length>0 && (
                    <>
                        <h1 className='text-white text-3xl font-bold self-start'>Discover</h1>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {
                                musics.map((music, index) => (
                                    <DiscoverCard key={index} music={music} />
                                ))
                            }
                            <div className="group relative">
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}