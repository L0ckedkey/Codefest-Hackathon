import { HTMLAttributes, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Container from './container';
import Button from './button';

import { useLoading } from "../contexts/loading-context"
import { useAuth } from "../contexts/auth-context"
import { chordify_backend } from "../../../declarations/chordify_backend"
import { Principal } from "@dfinity/principal"
import { toast } from "react-toastify"
import { MusicType } from '../types/music-type'
import { useParams } from 'react-router-dom';

export default function StatisticTable() {
  const { id } = useParams()
  const { setIsLoading } = useLoading()
  const [music, setMusic] = useState([])

  const fetch = async () => {
    try {
        // setIsLoading(true)
        const res = await chordify_backend.getMusics()
        const musicData = res.map((dataItem) => ({
          id: dataItem.id,
          name: dataItem.name,
          genres: dataItem.genres,
          author: dataItem.author,
          description: dataItem.description,
          volume: Number(dataItem.volume),
          supply: Number(dataItem.supply),
          price: Number(dataItem.price),
          imageUrl: dataItem.imageUrl,
          saleEnd: dataItem.saleEnd,
          username: dataItem.author.username,
        }));
        setMusic(musicData);
    } catch (error) {
        toast.error("Failed to get music")
    }
    setIsLoading(false)
  }

  fetch()

  return (
    <Container className="pt-12">
      <div className="flex justify-between border-b">
        <ul className="flex font-poppins gap-x-8 lg:text-2xl mt-auto text-base font-semibold">
          <li><button className="border-b-2 border-slate-900 pb-4 text-slate-900">Trending</button></li>
          <li><button className="pb-4 hover:text-slate-900 transition-colors duration-300">Top</button></li>
        </ul>
        <div className="flex gap-x-2 lg:gap-x-4 pb-2">
          <div className="hidden sm:flex">
            <DurationButton className="bg-slate-100 border-l cursor-default rounded-l-xl text-slate-900">1h</DurationButton>
            <DurationButton>6h</DurationButton>
            <DurationButton>24h</DurationButton>
            <DurationButton className="border-r rounded-r-xl">7d</DurationButton>
          </div>
          <Button>View All</Button>
        </div>
      </div>
      <div className="gg overflow-auto py-4">
        <div className="flex gap-x-8 md:gap-x-24">
          <StatTable data={music.slice(0, 5)} indexStart={1} />
          <StatTable data={music.slice(-5)} indexStart={6} />
        </div>
      </div>
    </Container>
  );
}

function StatTable({ data, indexStart }: { data: typeof MusicType; indexStart: number }) {
  return (
    <table className="flex-1 whitespace-nowrap w-full">
      <thead>
        <tr className="[&>th]:font-normal [&>th]:pb-4 [&>th]:px-4 [&>th]:text-xs first:[&>th]:pl-2 lg:[&>th]:text-sm text-left">
          <th className="w-1">#</th>
          <th>Collection</th>
          <th className="hidden md:table-cell">Floor price</th>
          <th className="text-right">Volume</th>
        </tr>
      </thead>
      <tbody className="font-semibold md:text-base text-left text-sm text-white">
        {data.map((item, i) => (
          <tr className="cursor-pointer first:[&>td]:pl-2 hover:bg-slate-100 [&>td]:px-4 [&>td]:py-3" key={i + indexStart}>
            <td className="w-1">{i + indexStart}</td>
            <td>
              <div className="flex gap-x-3 items-center md:gap-x-6 pr-6">
                <div className="aspect-square border lg:w-[4.25rem] overflow-hidden relative rounded-xl">
                  <img className="absolute inset-0 h-full object-center object-cover w-full" src={item.imageUrl} />
                </div>
                <div>
                  <p>{item.name}</p>
                  <p className="font-normal text-slate-500 text-xs">
                    Author: <span className="font-semibold">{item.username}</span>
                  </p>
                </div>
              </div>
            </td>
            <td className="hidden md:table-cell">{item.price} ICP</td>
            <td className="text-right">{item.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DurationButton({ children, className }: { children: ReactNode; className?: HTMLAttributes<HTMLButtonElement>['className'] }) {
  return (
    <button className={twMerge('border-y font-semibold h-fit lg:px-4 lg:py-3 lg:text-base px-3 py-2 text-sm', className)}>
      {children}
    </button>
  );
}
