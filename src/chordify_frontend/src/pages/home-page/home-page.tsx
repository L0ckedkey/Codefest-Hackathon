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
import Container from '../../components/container.tsx'

export default function Home() {
    const { banner, images } = useImage()
    return (
        <>
            {/* <Tabs /> */}
            <div className="relative w-full h-full flex flex-grow flex-col justify-start items-center overflow-x-hidden" >
                <div className='relative h-full w-full flex flex-col justify-end items-start'>
                    <img className='z-1 absolute bottom-0 top-0 w-full h-full object-cover blur-md bg-black opacity-50 ' src={banner} alt="" />
                    <div className='w-full mt-28 mb-10 flex flex-col justify-center items-center gap-4 text-white'>
                        <h1 className='text-5xl font-bold'>Chordify</h1>
                        <p className='max-w-5xl'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, mollitia perspiciatis? Eaque maiores repellendus delectus recusandae neque hic commodi doloremque fugit a tempora. Porro laboriosam corporis aliquid eligendi consectetur odit.</p>
                    </div>
                    <div className='px-8 z-10 box-border'>
                        <Carousel />
                    </div>
                </div>
                <div className='z-0 marquee w-[125%]  h-52 sm:h-40 md:h-60 bg-white -rotate-6 translate-y-1/3 sm:translate-y-1/2 bg-opacity-15'>
                    <div className="marquee__group">
                        {
                            images.map((image, index) => (
                                <img className='p-8' key={index} src={image} alt='' />
                            ))
                        }
                    </div>
                    <div className="marquee__group">
                        {
                            images.map((image, index) => (
                                <img className='p-8' key={index} src={image} alt='' />
                            ))
                        }
                    </div>
                </div>
                <img className='z-10 w-36 h-36 sm:w-56 sm:h-56 rounded-full object-cover self-end  lg:mr-44'
                    data-scroll
                    data-scroll-speed="2"
                    data-scroll-position="top"
                    data-scroll-direction="horizontal" src={banner} alt="" />

                <div className="px-4 py-8 sm:px-6 lg:px-8 box-border">
                    <h1 className='text-white text-3xl font-bold self-start'>Discover</h1>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            images.map((image, index) => (
                                <NFTCard key={index} image={image} />
                            ))
                        }
                        <div className="group relative">
                        </div>
                    </div>
                </div>
                <StatisticTable />
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