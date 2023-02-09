import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Map, Login } from "./pages";
import "./index.css";

const App = () => {
    return (
        <BrowserRouter>
            <header className="flex justify-between items-center w-full h-16 bg-black text-white px-3">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </header>
            <main className="w-full min-h-[calc(100vh-128px)] bg-white">
                <Routes>
                    <Route path="/" element={<Map />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <footer className="flex justify-start items-center w-full h-16 bg-black text-white px-3">
                <p>@DevRelBook | www.devrelbook.com | info@devrelbook.com</p>
            </footer>
        </BrowserRouter>
    );
}

export default App;