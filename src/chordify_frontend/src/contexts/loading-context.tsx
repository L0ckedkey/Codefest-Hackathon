import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface LoadingContextType{
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function useLoading():LoadingContextType{
    const context = useContext(loadingContext)
    if (!context) {
        throw new Error("useLoading must be used within an LoadingProvider");
    }
    return context;
}

const loadingContext = createContext<LoadingContextType | undefined>(undefined)

export default function LoadingProvider({ children }: { children: ReactNode }){
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(isLoading){
            toast.loading("Loading...")
        }
        else{
            toast.dismiss()
        }
    }, [isLoading])

    return (
        <loadingContext.Provider value={{ isLoading, setIsLoading } as LoadingContextType}>
            {
                isLoading && (
                    <>
                        <div className="fixed inset-0 z-[99] w-full h-screen bg-black bg-opacity-85 overflow-hidden">
                        </div>
                    </>
                )
            }
            {children}
        </loadingContext.Provider>
    )
}