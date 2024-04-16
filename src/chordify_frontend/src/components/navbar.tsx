import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon, WalletIcon } from "@heroicons/react/24/outline";
import Logo from "./logo";
import Auth from "./auth/auth";
import { useAuth } from "../contexts/auth-context";

export default function Navbar() {

    const { user, isLoggedIn, logOut } = useAuth()

    return (
        <>
            <div id="navbar"
                className="fixed z-40 top-0 w-full bg-transparent flex justify-around items-center py-6 text-white transition-colors duration-500">
                <Logo />
                <div className="w-fit flex justify-center items-center gap-8 font-semibold text-lg">
                    <a href="/gallery" className="group">Gallery
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                    </a>
                    <a href="#" className="group">Stats
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                    </a>
                    <a href="/create-music" className="group">Create
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                    </a>
                </div>
                <div className="relative w-fit flex items-center bg-white bg-opacity-20 rounded-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 outline-none">
                            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                        </button>
                    </span>
                    <input type="search" name="search" className="w-96 bg-transparent border-none outline-none ring-0 py-2 pl-10 text-md text-white focus:outline-none focus:ring-0 focus:bg-none placeholder:text-gray-400" placeholder="Search..." autoComplete="off" />
                </div>
                <div className="w-fit flex items-center gap-4 font-medium text-sm">
                    {
                        isLoggedIn ? (
                            <>
                                <h1>{user.username}</h1>
                                <a href="#" className=" bg-white bg-opacity-20 flex gap-4 items-center p-3 rounded-lg hover:bg-opacity-30">
                                    <UserCircleIcon className="w-6 h-6" />
                                </a>
                                <a href="#" className="bg-white bg-opacity-20 flex gap-4 items-center p-3 rounded-lg hover:bg-opacity-30">
                                    <ShoppingCartIcon className="w-6 h-6" />
                                </a>
                            </>
                        ) : <Auth />
                    }

                </div>
            </div>
        </>
    )
}