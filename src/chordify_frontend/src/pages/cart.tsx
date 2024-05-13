import { useEffect, useState } from 'react';
import CartRow from '../components/cart/cart-row.tsx';
import { useImage } from '../hooks/use-image';
import DiscoverSection from './home-page/discover-section.tsx';
import { chordify_backend } from "../../../declarations/chordify_backend"
import { useAuth } from '../contexts/auth-context.tsx';

export default function Cart() {

    
    const { banner, images } = useImage();
    const [cart, setCart] = useState()
    const { user } = useAuth();

    // useEffect(() => {
    //     async function fetchCart() {
    //         try {
    //             // setIsLoading(true)
    //             const res = await chordify_backend.getCarts()
    //             if ('Ok' in res) {
    //                 const musicData = res.Ok.map((music) => ({
    //                     id: music.id,
    //                     author: music.author,
    //                     name: music.name,
    //                     description: music.description,
    //                     volume: Number(music.volume),
    //                     imageUrl: music.imageUrl,
    //                     price: Number(music.price),
    //                     supply: Number(music.supply),
    //                     genres: music.genres,
    //                     saleEnd: Number(music.saleEnd)
    //                 }))
                    
    //                 // setMusics(musicData)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         // setIsLoading(false)
            
    //     }

    //     fetchCart();
    // }, []);

    return (
        <>
            <div className="relative max-w-screen w-full h-full text-[white] p-20">
                <h1 className="text-3xl font-semibold self-start py-6 box-border">Cart</h1>

                <div className="relative flex">
                    <div className='mr-20'>
                        {
                            images.map((image) => {
                                return <CartRow image={image} musicName={"All We Know"} shopName={"test"} volume={2}/>
                            })
                        }
                    </div>


                    <div>
                        <div className='border-2 rounded-md bg-white bg-opacity-10 '>
                            <div className='min-w-[20vw] min-h-[10vw] p-4'>
                                <div className='font-bold text-xl mb-4'>Summary</div>

                                
                                <div className='flex justify-between mt-2 text-[white] opacity-50'>
                                    <div>All We Know</div>
                                    <div>0.5 ICP</div>
                                </div>
                                <div className='flex justify-between mt-2 text-[white] opacity-50'>
                                    <div>Yellow</div>
                                    <div>2 ICP</div>
                                </div>
                                <div className='flex justify-between mt-2 text-[white] opacity-50'>
                                    <div>Grenade</div>
                                    <div>5 ICP</div>
                                </div>
                                
                                <div className='flex justify-between mt-4 font-bold border-t-2 pt-2'>
                                    <div>Total</div>
                                    <div>20 ICP</div>
                                </div>

                                <div className='mt-3'>
                                    <button className="w-full bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md py-2">Checkout</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 text-[white] opacity-50'>
                            <div>Notes:</div>
                            <div>You need to use ICP Blockchain Currency for payment and agreed the Chordify term and condition</div>
                        </div>

                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-semibold self-start py-6 box-border">Recommended For You</h1>
                    

                    <div className="px-4 py-8 sm:px-6 lg:px-8 box-border">
                        <DiscoverSection />
                    </div>
                </div>
            </div>
        </>
    )
}