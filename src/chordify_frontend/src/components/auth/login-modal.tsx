import { WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from "react"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import Cookies from "js-cookie"
import { UserType } from "../../types/user-type"
import { toast } from "react-toastify"
import { Principal } from "@dfinity/principal"

export default function Login({ handleClick, goToSignUp }: { handleClick: () => void, goToSignUp: () => void }) {

    const [auth, setAuth] = useState({
        username: "",
        password: ""
    })
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const res = await chordify_backend.login({ username: auth.username, password: auth.password })
            if ('Ok' in res) {
                const user:UserType = res.Ok
                toast.success("Login Success")
                Cookies.set("authentication", user.id.toText())
            }
        } catch (error) {
            toast.error("Login Failed")
            console.log("Error")
            console.log(error)
        }
        handleClick()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setAuth({ ...auth, [name]: value })
    }

    useEffect(() => {
    }, [])

    return (
        <>
            <div data-aos="fade-in" onClick={handleClick} className="fixed inset-0 w-full min-w-screen min-h-screen h-full z-50 bg-black bg-opacity-80 flex justify-center items-center sm:py-10 sm:px-20 px-8 py-4 box-border overflow-auto">
                <div data-aos="zoom-in-down" onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()} className=" w-full max-w-md h-fit bg-gray-200 rounded-xl  px-8 py-12  box-border">
                    <div className="flex flex-col ">
                        <button onClick={handleClick} className="absolute top-4 right-4 w-10 h-10 p-2 bg-gray-200 hover:bg-gray-300 active:scale-110 transition-all duration-150 rounded-full text-black ">
                            <XMarkIcon />
                        </button>
                        <div className="w-24 h-24 p-4 flex justify-center items-center self-center rounded-xl bg-slate-400 shadow-black shadow-md font-bold text-7xl">
                            <p>C</p>
                        </div>
                        <p className="text-3xl text-black font-semibold self-center my-10">Connect to Chordify</p>
                        <div className="flex flex-col gap-6 ">
                            <input onChange={handleChange} value={auth.username} className="w-full auth-input" placeholder="Username" name="username" type="text" />
                            <input onChange={handleChange} value={auth.password} className="w-full auth-input" placeholder="Password" name="password" type="password" />
                            <button onClick={handleSubmit} className="relative btn-glass w-full bg-black  rounded-md p-4 font-semibold text-md">Sign In
                            </button>
                            <div className="w-full flex items-center gap-2 text-gray-400 text-xs">
                                <hr className="border-b-[1px] border-gray-400 w-full" />
                                OR
                                <hr className="border-b-[1px]  border-gray-400 w-full" />
                            </div>
                            <button onClick={goToSignUp} className="relative  w-full ring-1 ring-black text-black  rounded-md p-4 font-semibold text-md">Sign Up
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}