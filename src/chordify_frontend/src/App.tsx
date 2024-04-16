import BaseLayout from "./template/base-layout.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home-page/home-page.tsx";
import Debug from "./pages/Debug.tsx";
import CreateMusic from "./pages/create-music-page/create-music-page.tsx";
import Gallery from "./pages/gallery-page.tsx";
import AuthProvider from "./contexts/auth-context.tsx";

function App() {
    return (
        <AuthProvider>
            <BaseLayout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-music" element={<CreateMusic />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/debug" element={<Debug />} />
                    </Routes>
                </BrowserRouter>
            </BaseLayout>
        </AuthProvider>
    )
}

export default App
