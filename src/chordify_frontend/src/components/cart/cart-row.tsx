import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

interface CartRowProps {
    image: string;
    musicName: string;
    shopName: string;
    volume: number;
}

function CartRow(props: CartRowProps) {

    const [quantity, setQuantity] = useState(0);

    function handleMin() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        } 
    }

    function handlePlus() {
        setQuantity(quantity + 1);
    }
    
  const { image, musicName, shopName, volume } = props;
  return (
    <div className='w-[60vw] flex mb-10 pb-6 border-b-2 border-b-[white] border-opacity-50'>
        <div className='mr-20'>
            <img src={image} width={150} className='rounded-lg'/>
        </div>

        <div className='mt-8'>
            <div className='text-xl mb-2'>{musicName}</div>
            <div className='text-[#5C9DFF]'>Owned by {shopName}</div>
        </div>

        <div className='ml-auto mt-8'>
            <div className='text-xl font-bold mt-2 text-end mb-6'>0.5 ICP</div>
            <div className='flex items-center'>
                <div>

                    <TrashIcon className='text-white w-8 h-8 mr-8 hover:cursor-pointer'/>
                </div>

                <div className='flex'>
                    <div>
                        <button onClick={handleMin} className="bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md h-full w-10">-</button>        
                    </div>
                    <input type='number' className='text-center bg-black w-20 mx-2 rounded-lg' value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))}/>
                    <div>
                        <button onClick={handlePlus} className="bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md h-full w-10">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartRow