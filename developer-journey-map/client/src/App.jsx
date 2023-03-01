import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Map, Login, Dashboard } from "./pages";
import "./assets/styles/app.css";

const App = () => {
    return (
        <BrowserRouter>
            <header id="header">
                <Link to="/dashboard">Home</Link>
                <Link to="/login">Login</Link>
            </header>
            <main id="main">
                <Routes>
                    <Route path="/dashboard/:uid" element={<Dashboard />} />
                    <Route path="/map/:id" element={<Map />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <footer id="footer">
                <div>@DevRelBook | www.devrelbook.com | info@devrelbook.com</div>
                <div>Logo</div>
            </footer>
        </BrowserRouter>
    );
}

export default App;