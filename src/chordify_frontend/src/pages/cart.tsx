import { useEffect, useState } from 'react';
import CartRow from '../components/cart/cart-row.tsx';
import { useImage } from '../hooks/use-image';
import DiscoverSection from './home-page/discover-section.tsx';
import { chordify_backend } from "../../../declarations/chordify_backend"
import { useAuth } from '../contexts/auth-context.tsx';
import { MusicCart } from '../types/music-cart.ts';
import { Principal } from '@dfinity/principal';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export default function Cart() {

    
    const { banner, images } = useImage();
    const [cart, setCart] = useState()
    const [total, setTotal] = useState(0)
    const { user } = useAuth();
    const [musics, setMusics] = useState<MusicCart[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchCart() {
            if (user.id) {
                
                try {
                    // setIsLoading(true)
                    const res = await chordify_backend.getCarts(user.id);
                    console.log(res)
                    
                    if ('Ok' in res) {
                        const musicData = res.Ok.map((music) => ({
                            id: music.id,
                            musicId: music.musicId,
                            name: music.name,
                            genres: music.genres,
                            author: music.author,
                            imageUrl: music.imageUrl,
                            quantity: Number(music.quantity),
                            price: Number(music.price),
                        }))
                        
                        setMusics(musicData)
                    }
                    else {
                        setMusics([]);
                    }
                } catch (error) {
                    console.log(error)
                    setMusics([]);
                }
            }
            // setIsLoading(false)
            
        }

        
        fetchCart();
    }, [user, refresh, total]);

    async function handlePlus(id: Principal, quantity: number) {
        const res = await chordify_backend.updateCart(user.id, id, BigInt(quantity));
        console.log(res);
        
        setRefresh(!refresh);
    }
    
    async function handleMin(id: Principal, quantity: number) {
        const res = await chordify_backend.updateCart(user.id, id, BigInt(quantity));
        setRefresh(!refresh);
    }

    function getTotal() {
        var temp = 0;
        musics.forEach(music => {
            temp += (music.price * music.quantity / 100);
        });
        return temp
    }
    


    
    async function handleDelete(id : Principal) {
        console.log(id);
        
        const res = await chordify_backend.removeCart(user.id, id);
        console.log(res)
        setRefresh(!refresh);
        toast.success("Removed From Cart!");
    }
    async function handleCheckout(){
        try {
            const res = await chordify_backend.checkout(user.id)
            console.log(res)
            setRefresh(!refresh);
            toast.success("Checkout Success");
            redirect("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="relative max-w-screen w-full h-full text-[white] p-20">
                <h1 className="text-3xl font-semibold self-start py-6 box-border">Cart</h1>

                <div className="relative flex">
                    <div className='mr-20'>
                        {
                            musics.length > 0 ?
                            musics.map((music, idx) => {
                                return <CartRow key={idx} id={music.id} handleMin={handleMin} handlePlus={handlePlus} handleDelete={handleDelete} price={music.price} image={music.imageUrl} musicName={music.name} shopName={music.author.username} volume={music.quantity}/>
                            })
                            :
                            <div className='w-[60vw] flex mb-10 pb-6 border-b-2 border-b-[white] border-opacity-50'>
                                There is no item in cart
                            </div>
                        }
                    </div>


                    <div>
                        <div className='border-2 rounded-md bg-white bg-opacity-10 '>
                            <div className='min-w-[20vw] min-h-[10vw] p-4'>
                                <div className='font-bold text-xl mb-4'>Summary</div>

                                
                                {
                                    musics?.map((music : MusicCart, idx) => {
                                        return <div key={idx} className='flex justify-between mt-2 text-[white] opacity-50'>
                                            <div>{music.name}</div>
                                            <div>{music.quantity * music.price / 100} ICP</div>
                                        </div>
                                    })
                                }
                                
                                <div className='flex justify-between mt-4 font-bold border-t-2 pt-2'>
                                    <div>Total</div>
                                    <div>{getTotal()} ICP</div>
                                </div>

                                <div className='mt-3'>
                                    <button onClick={handleCheckout} className="w-full bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md py-2">Checkout</button>
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