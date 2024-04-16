import { WalletIcon } from "@heroicons/react/24/outline";
import { useAuthModal } from "../../hooks/use-auth-modal";
import Login from "./login-modal";
import Register from "./register-modal";
export default function Auth() {
    const { openSignIn, openSignUp, goToSignIn, goToSignUp, handleOpenSignIn, handleOpenSignUp } = useAuthModal();
    return (<>
            <button onClick={handleOpenSignIn} className="bg-white bg-opacity-20 flex gap-4 items-center p-3 rounded-lg hover:bg-opacity-30">
                <WalletIcon className="w-6 h-6"/>
                Login
            </button>
            <button onClick={handleOpenSignUp} className="bg-white bg-opacity-20 flex gap-4 items-center p-3 rounded-lg hover:bg-opacity-30">
                <WalletIcon className="w-6 h-6"/>
                Register
            </button>
            {openSignIn && (<Login handleClick={handleOpenSignIn} goToSignUp={goToSignUp}/>)}
            {openSignUp && (<Register handleClick={handleOpenSignUp} goToSignIn={goToSignIn}/>)}
        </>);
}
