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

function App() {
    return (
        <>
            <ToastContainer />
            <LoadingProvider>
                <AuthProvider>
                    <BaseLayout>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/create-music" element={<CreateMusic />} />
                                <Route path="/music/:id" element={<MusicDetail />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/debug" element={<Debug />} />
                            </Routes>
                        </BrowserRouter>
                    </BaseLayout>
                </AuthProvider>
            </LoadingProvider>
        </>
    )
}

export default App
