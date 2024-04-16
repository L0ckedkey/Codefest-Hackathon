import Navbar from '../components/navbar.tsx';
export default function BaseLayout({ children }) {
    return (<>
      <Navbar />
      <main id='main' className='relative bg-black min-w-screen w-full min-h-screen h-full   flex  flex-col justify-start items-center overflow-auto '>{children}</main>
    </>);
}
