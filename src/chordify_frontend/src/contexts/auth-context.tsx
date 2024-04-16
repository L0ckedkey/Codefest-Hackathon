import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies  from "js-cookie";
import { chordify_backend } from "../../../declarations/chordify_backend";
import { UserType } from "../types/user-type";


interface AuthContextType{
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

export default function AuthProvider({children}: {children: ReactNode}){

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logOut = () => {
        Cookies.remove("authentication")
        setUser({})
        setIsLoggedIn(false)
    }

    useEffect(() => {
        const getUser = async () =>{
            const token = Cookies.get("authentication")
            if(token){
                const res = await chordify_backend.getUserById(token)
                if('Ok' in res){
                    setUser(res.Ok as any)
                    setIsLoggedIn(true)
                }else{
                    setUser({})
                    setIsLoggedIn(false)
                }
            }
        }
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, isLoggedIn, logOut} as AuthContextType}>
            {children}
        </AuthContext.Provider>
    )
}