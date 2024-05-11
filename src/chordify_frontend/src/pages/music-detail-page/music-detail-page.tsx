import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MusicType } from "../../types/music-type"
import { useLoading } from "../../contexts/loading-context"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import { Principal } from "@dfinity/principal"
import { toast } from "react-toastify"
import formatRemainingTime from "../../utils/format-time"
import { Bars3BottomLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function MusicDetail() {

    const { id } = useParams()
    const { setIsLoading } = useLoading()
    const [music, setMusic] = useState<MusicType>()
    const [remainingTime, setRemainingTime] = useState<string>();

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
                    volume: Number(data.volume),
                    saleEnd: Number(data.saleEnd)
                }
                setMusic(musicRes)
            }
        } catch (error) {
            toast.error("Failed to get music")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let animationFrameId: number;

        const updateTime = () => {
            if (music && music.saleEnd) {
                setRemainingTime(formatRemainingTime(music.saleEnd));
                animationFrameId = requestAnimationFrame(updateTime);
            }
        };

        updateTime();

        return () => cancelAnimationFrame(animationFrameId);
    }, [music]);

    useEffect(() => {
        fetch()
    }, [])


    return (
        <>
            {
                music && (
                    <div className="w-full h-full max-h-screen flex items-center py-24 px-20">
                        <div className="w-full flex justify-center gap-20 text-white">
                            <div className="max-w-xl  w-full h-full rounded-md overflow-hidden">
                                <img className="w-full h-full max-w-full max-h-[600px] rounded-md object-cover hover:scale-110  transition-transform duration-300" src={music!.imageUrl} loading="lazy" alt="" />
                            </div>
                            <div className="max-w-lg w-full flex flex-col gap-6 ">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="w-fit flex flex-col">
                                        <h1 className="text-white font-bold text-3xl">{music!.name}</h1>
                                        <div className="group w-fit flex gap-1 text-blue-400 font-medium text-md ">
                                            <a href={`/author/${music!.author.id}`} className=" w-full">Owned by {music!.author.username}
                                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-500"></span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2">
                                        {
                                            music!.genres.map((genre, index) => (
                                                <a href={`/genre/${genre}`} className="text-blue-400 font-regular text-md underline" key={index}>#{genre}</a>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-4 p-6 box-border rounded-md ring-1 ring-white">
                                    <div className="w-full flex justify-between items-center font-regular">
                                        <p className="text-md">Current Price</p>
                                        <p className="text-xl">{remainingTime}</p>
                                    </div>
                                    <div className="w-full flex items-center gap-4">
                                        <p className="text-3xl font-bold">{music!.price} ICP</p>
                                        <p className="text-md font-regular">${music!.price * 15} </p>
                                    </div>
                                    <div className="w-full flex items-center bg-blue-500  rounded-lg btn-glass">
                                        <button className="w-full py-3">Buy Now</button>
                                        <button className="px-6 py-3 ring-1 rounded-r-lg ring-white ">
                                            <ShoppingCartIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col flex-grow  rounded-md ring-1 ring-white">
                                    <div className="w-full p-3 flex items-center gap-2 ring-1 ring-white rounded-t-md">
                                        <Bars3BottomLeftIcon className="w-8 h-8" />
                                        <p className="text-md">Description</p>
                                    </div>
                                    <div className="w-full p-3">
                                        {music!.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}