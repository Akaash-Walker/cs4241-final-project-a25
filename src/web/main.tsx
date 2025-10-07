import {createRoot} from 'react-dom/client'
import Home from "./home.tsx";
import {StrictMode} from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import TestPage from "./testPage.tsx";
import Heat from "./components/Heat.tsx"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/heat" element={<Heat/>}/>
                <Route path={"/test"} element={<TestPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
