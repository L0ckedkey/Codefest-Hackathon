import { useEffect, useState } from "react";
import { useImage } from "../../hooks/use-image";
import Splide from '@splidejs/splide';
import { MusicType } from "../../types/music-type";
import { useLoading } from "../../contexts/loading-context";
import { Link } from "react-router-dom";
import { chordify_backend } from "../../../../declarations/chordify_backend";

export default function Carousel() {

    const {images} = useImage()

    // const [musics, setMusics] = useState<MusicType[]>([])
    // const { isLoading, setIsLoading } = useLoading()

    // const fetchMusics = async () => {
    //     try {
    //         setIsLoading(true)
    //         const res = await chordify_backend.getMusicByVolumeDesc({ limit: BigInt(12) })
    //         if ('Ok' in res) {
    //             const musicData = res.Ok.map((music) => ({
    //                 id: music.id,
    //                 author: music.author,
    //                 name: music.name,
    //                 description: music.description,
    //                 volume: Number(music.volume),
    //                 imageUrl: music.imageUrl,
    //                 price: Number(music.price),
    //                 supply: Number(music.supply),
    //                 genres: music.genres,
    //                 saleEnd: Number(music.saleEnd)
    //             }))
    //             setMusics(musicData)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setIsLoading(false)
    // }


    // useEffect(() => {
    //     fetchMusics()
    // }, [])

    useEffect(() => {
        var splide = new Splide(".splide", {
            type: 'loop',
            perMove: 1,
            perPage: 5,
            autoplay: true,
            gap: '1rem',
            pagination: false,
            snap: true,
            lazyLoad: 'nearby',
            breakpoints: {
                640: {
                    perPage: 2,
                    gap: '1rem',
                },
                480: {
                    perPage: 1,
                    gap: '1rem'
                }
            }
        });
        splide.mount();
    }, [])
    return (
        <>
            <section

                className="splide group" aria-label="Splide Basic HTML Example">
                <div className="splide__arrows text-xl group-hover:opacity-100 opacity-0 transition-all duration-300">
                </div>
                <div className="splide__track">
                    <ul className="splide__list">
                        {/* {
                            musics.map((music, index) => (
                                <Link to={`/music/${music!.id}`} key={index} className="splide__slide overflow-hidden rounded-lg hover:cursor-pointer ">
                                    <img className="rounded-md hover:scale-110  transition-transform duration-300 w-80 h-80" src={music!.imageUrl}  />
                                </Link>
                            ))
                        } */}
                        {
                            images.map((image, index) => (
                                <div key={index} className="splide__slide overflow-hidden rounded-lg hover:cursor-pointer ">
                                    <img className="rounded-md w-full hover:scale-110  transition-transform duration-300 " src={image}  />
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}