import { createRoot } from 'react-dom/client'
import Home from "./home.tsx";
import {StrictMode} from "react";
import {BrowserRouter, Route, Routes} from "react-router";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
