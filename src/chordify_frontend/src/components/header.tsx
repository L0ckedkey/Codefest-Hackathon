import Container from "./container.tsx";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserCircleIcon,
    WalletIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import chordify_dark_logo from '../assets/chordify-header-dark-icon.png'
import chordify_light_logo from '../assets/chordify-header-light-icon.png'
import Logo from "./logo.tsx";

export default function Header() {
    const [isSticked, setIsSticked] = useState(false)

    return (
        <header className={`sticky z-50 -top-[0.1px] transition-colors duration-150' bg-slate-100 text-black`}>
            <Container>
                <div className={`flex h-[4.25rem] items-center gap-x-2 py-2.5 bg-red-200`}>
                    <button className="h-full px-1 xl:hidden">
                        <Bars3Icon className="h-8 w-8" />
                    </button>
                    <div className="flex h-full items-center">
                        <div className="relative">
                            <Logo />
                        </div>
                        <ul className={`ml-6 hidden gap-x-6 border-l pl-6 font-semibold xl:flex ${isSticked ? 'border-slate-200' : 'border-white/20'}`}>
                            <li>
                                <a href="/drops">Drops</a>
                            </li>
                            <li>
                                <a href="/rankings">Stats</a>
                            </li>
                            <li>
                                <a href="/create">Create</a>
                            </li>
                        </ul>
                    </div>
                    <div className="relative ml-6 hidden h-full flex-1 sm:block">
                        <MagnifyingGlassIcon className={`absolute inset-y-0 left-3 z-10 my-auto h-5 w-5 stroke-2 ${isSticked && 'text-slate-500'}`} />
                        <input
                            name="Search"
                            type="text"
                            className={`h-full w-full rounded-xl border bg-white/10 pl-10 hover:bg-white/20 focus:ring-0 ${isSticked ? 'border-slate-200 focus:border-slate-200' : 'border-transparent placeholder:text-slate-200 focus:border-transparent'}`}
                            placeholder="Search"
                        />
                    </div>
                    <div className=" h-full flex gap-4">
                        <button className={`flex h-full items-center rounded-l-xl border-y border-l bg-white/10 px-4 font-semibold hover:bg-white/20 ${!isSticked && 'border-transparent'}`}>
                            <WalletIcon className="mr-2 h-6 w-6 stroke-2" />
                            Connect Wallet
                        </button>
                        <button className={`h-full rounded-r-xl border bg-white/10 px-3 hover:bg-white/20 ${!isSticked && 'border-transparent border-l-white/20'}`}>
                            <UserCircleIcon className="h-6 w-6 stroke-2" />
                        </button>
                    </div>
                    <button className={`ml-auto h-full rounded-xl border bg-white/10 px-3 hover:bg-white/20 sm:hidden ${!isSticked && 'border-transparent'}`}>
                        <MagnifyingGlassIcon className="h-6 w-6 stroke-2" />
                    </button>
                    <button className={`h-full rounded-xl border bg-white/10 px-3 hover:bg-white/20 ${!isSticked && 'border-transparent'}`}>
                        <ShoppingCartIcon className="h-6 w-6 stroke-2" />
                    </button>
                </div>
            </Container>
        </header>
    )
}
