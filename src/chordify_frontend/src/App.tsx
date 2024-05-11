import BaseLayout from "./template/base-layout.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home-page/home-page.tsx";
import Debug from "./pages/Debug.tsx";
import CreateMusic from "./pages/create-music-page/create-music-page.tsx";
import Gallery from "./pages/gallery-page.tsx";
import AuthProvider from "./contexts/auth-context.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingProvider from "./contexts/loading-context.tsx";
import MusicDetail from "./pages/music-detail-page/music-detail-page.tsx";
import Rankings from "./pages/rankings.tsx";
import Cart from "./pages/cart.tsx";
import MyProfile from "./pages/my-profile.tsx";

function App() {
    return (
        <>
            <AuthProvider>
                <ToastContainer />
                <LoadingProvider>
                    <BaseLayout>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/create-music" element={<CreateMusic />} />
                                <Route path="/music/:id" element={<MusicDetail />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/rankings" element={<Rankings />} />
                                <Route path="/debug" element={<Debug />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<MyProfile />} />
                            </Routes>
                        </BrowserRouter>
                    </BaseLayout>
                </LoadingProvider>
            </AuthProvider>
        </>
    )
}

export default App
