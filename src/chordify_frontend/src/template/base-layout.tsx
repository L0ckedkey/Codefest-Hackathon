import { ReactNode, useEffect } from 'react'
import Navbar from '../components/navbar.tsx'
import LocomotiveScroll from 'locomotive-scroll'

interface BaseLayoutProps {
  children: ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Navbar />
      <main id='main' className='relative bg-black min-w-screen w-full min-h-screen h-full   flex  flex-col justify-start items-center overflow-auto '>{children}</main>
    </>
  )
}
