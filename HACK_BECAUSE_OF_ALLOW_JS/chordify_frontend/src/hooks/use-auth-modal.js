import { useState } from "react";
export const useAuthModal = () => {
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const goToSignIn = () => {
        setOpenSignIn(true);
        setOpenSignUp(false);
    };
    const goToSignUp = () => {
        setOpenSignUp(true);
        setOpenSignIn(false);
    };
    const handleOpenSignIn = () => {
        setOpenSignIn(!openSignIn);
    };
    const handleOpenSignUp = () => {
        setOpenSignUp(!openSignUp);
    };
    return {
        openSignIn,
        openSignUp,
        handleOpenSignIn,
        handleOpenSignUp,
        goToSignIn,
        goToSignUp,
    };
};
