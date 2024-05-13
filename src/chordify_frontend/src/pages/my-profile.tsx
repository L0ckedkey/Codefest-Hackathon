import { Container } from "@chakra-ui/react"
import {Content} from "../components/content/content"
import ProfileSection from "../components/profile-section/profile-section"
import { useEffect, useState } from "react";
import { UserType } from "../types/user-type";
import { chordify_backend } from "../../../declarations/chordify_backend";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MyProfile() {

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [profile, setProfile] = useState<UserType>();
    const [username, setUsername] = useState<String | undefined>("");
    const { user, isLoggedIn} = useAuth()

    const handleUpdateUserName = () => {
        setIsUpdating(true);
        setUsername(profile?.username);
    }

    const handleCloseUpdateUserName = () => {
        setIsUpdating(false);
    }

    useEffect(() => {
        const fetch = async () => {
            if (user.id === undefined) return;
            
            setIsLoading(true)
            const res = await chordify_backend.getUserById(user.id!)
            if ('Ok' in res) {
                const data = res.Ok
                const userRes: UserType = {
                    id: data.id,
                    username: data.username,
                    imageUrl: data.imageUrl
                }
                setProfile(userRes)
                
            }
            setIsLoading(false)
        }
        fetch();
    }, [user]);


    return (
        <div className="relative max-w-screen w-full h-full text-[white] p-20">

            {
                isUpdating &&
                <div className="absolute bg-[black] w-[30vw] border-[white] border-2 pb-6 pt-2 px-10 rounded-lg z-20 transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%]">
                    <div className="flex justify-end w-full">
                        <button onClick={handleCloseUpdateUserName}><XMarkIcon className="h-8 w-8"/></button>
                    </div>
                    <div className="mb-4 text-center text-2xl">Update Username</div>

                    <div>
                        <div className="mb-2">Username</div>
                        <div className="mb-4">
                            <input type="text" className="rounded-lg w-full bg-black border-2 border-[white]" value={username + ""} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <button className="w-full bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md py-2">Update</button>
                        </div>
                    </div>
                </div>
            }

            {
                isUpdating &&
                <div className="absolute bg-[black] w-[80vw] h-[80vh] bg-opacity-60 z-10">

                </div>
            }

            <div className="mt-4 flex flex-col items-center">
                <div className="mb-6">
                    <img src={profile?.imageUrl} className="rounded-full w-[18vw] h-[18vw]"/>
                </div>

                <div className="mb-6">
                    <div className="font-bold text-[24px] flex items-center">
                        <div className="mr-2">{profile?.username} </div>
                        <div>
                            <button onClick={handleUpdateUserName} className="w-6 h-6"><PencilSquareIcon/></button>
                        </div>
                    </div>
                </div>

                <div className="w-[30vw] border-[white] border-2 rounded-md py-4 px-8 bg-[black] bg-opacity-10">
                    <div className="flex justify-between mb-4 px-[2px]">
                        <div>Money</div>
                        <div>{profile?.money} ICP</div>
                    </div>

                    <div>
                        
                    <div>
                        <input type="text" className="rounded-lg w-full bg-black border-2 border-[white]" value={profile?.username}/></div>
                    </div>

                    <div className='mt-6'>
                        <button className="w-full bg-[#0148FF] hover:bg-opacity-80 text-white font-semibold rounded-md py-2">Top Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}