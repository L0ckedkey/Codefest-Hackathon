import { useImage } from '../../hooks/use-image.tsx'
import Carousel from './home-carousel.tsx'
import NFTCard from './discover-card.tsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MAIN_TABS } from '../../types/consts.ts'
import {
    FreeMode,
    Navigation
} from 'swiper/modules'
import StatisticTable from '../../components/statistics-table.tsx'
import DiscoverSection from './discover-section.tsx'
import { useEffect, useState } from 'react'
import { chordify_backend } from '../../../../declarations/chordify_backend/index'
import { useLoading } from '../../contexts/loading-context.tsx'
import { MusicType } from '../../types/music-type.ts'

export default function Home() {
    const { banner, images } = useImage()
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
            {/* <Tabs /> */}
            <div className="relative max-w-screen w-full h-full flex  flex-col justify-start items-center oveflow-x-hidden " >
                <div className='relative h-full w-full flex flex-col justify-end items-start'>
                    <img className='z-1 absolute bottom-0 top-0 w-full h-full object-cover blur-md bg-black opacity-50 ' src={banner} alt="" />
                    <div className='w-full mt-28 mb-10 flex flex-col justify-center items-center gap-4 text-white'>
                        <h1 className='text-5xl font-bold'>Chordify</h1>
                        <p className='max-w-5xl'>
                        Chordify is a cutting-edge platform that revolutionizes the music industry by introducing non-fungible tokens (NFTs) specifically designed for songs and audio content. Unlike traditional NFT platforms that focus on visual art or digital collectibles, Chordify is dedicated to empowering musicians, producers, and audio creators to tokenize and monetize their work in a unique and secure manner.
                        </p>
                    </div>
                    <div className='px-8 z-10 box-border'>
                        <Carousel />
                    </div>
                </div>
                <div className='relative w-[125%] overflow-x-visible  h-fit'>
                    <div className=' marquee w-full h-52 sm:h-60 bg-white -rotate-6  bg-opacity-15 translate-y-1/3 sm:translate-y-1/2'>
                        <div className="marquee__group">
                            {
                                musics.map((image, index) => (
                                    <img className='p-6 max-w-60' key={index} src={image.imageUrl} alt='' />
                                ))
                            }
                        </div>
                        <div className="marquee__group">
                            {
                                musics.map((image, index) => (
                                    <img className='p-6 max-w-60' key={index} src={image.imageUrl} alt='' />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <img className='z-10 w-36 h-36 sm:w-56 sm:h-56 rounded-full object-cover self-end  lg:mr-44' src={banner} alt="" />
                <div className="px-4 py-8 sm:px-6 lg:px-8 box-border">
                    <DiscoverSection />
                </div>
            </div >
        </>
    )
}

function Tabs() {
    return (
        <div className="pt-8 sm:px-0">
            <nav className="scroll-mask" id="main-tabs">
                <Swiper className='flex' spaceBetween={16} slidesPerView={'auto'} freeMode={true} navigation modules={[FreeMode, Navigation]} tag="ul">
                    {
                        MAIN_TABS.map((tab, index) => (
                            // <li key={index} className="swiper-slide rounded-lg first:bg-white/10 hover:bg-white/10">
                            //     <a href={`/${tab.toLowerCase()}`} className="block w-fit px-4 py-2 text-sm font-semibold text-white md:text-base">
                            //         {tab}
                            //     </a>
                            // </li>
                            <SwiperSlide key={tab} tag="li" className="rounded-lg first:bg-white/10 hover:bg-white/10">
                                <a href={`/${tab.toLowerCase()}`} className="block w-fit px-4 py-2 text-sm font-semibold text-white md:text-base">
                                    {tab}
                                </a>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </nav>
        </div>
    )
}