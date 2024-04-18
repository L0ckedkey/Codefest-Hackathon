import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { chordify_backend } from "../../../declarations/chordify_backend";
import { UserType } from "../types/user-type";
import { Principal } from "@dfinity/principal";


interface AuthContextType {
    user: UserType;
    isLoggedIn: boolean;
    logOut: () => void;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<UserType>({} as UserType)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logOut = () => {
        Cookies.remove("authentication")
        setUser({} as UserType)
        setIsLoggedIn(false)
    }

    const init = async () =>{
        try {
            const authentication = Cookies.get("authentication")
            if(authentication){
                const id = Principal.fromText(authentication)
                const res = await chordify_backend.getUserById(id)
                if('Ok' in res){
                    setIsLoggedIn(true)
                    const user: UserType = res.Ok
                    setUser(user)
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, logOut } as AuthContextType}>
            {children}
        </AuthContext.Provider>
    )
}