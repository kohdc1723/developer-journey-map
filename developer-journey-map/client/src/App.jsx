import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Map, Login, Dashboard } from "./pages";
import "./assets/styles/app.css";
import "./index.css";
import "./app.css"
import { useEffect, useState } from 'react';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:3800/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            }).then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            }).then((resObject) => {
                setUser(resObject.user);
            }).catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);

    return (
        <BrowserRouter>
            <header id="header">
                <Link to="/dashboard">Home</Link>
                <Link to="/login">Login</Link>
            </header>
            <main id="main">
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/dashboard/:uid" /> : <Login />} />
                    <Route path="/dashboard/:uid" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/map/:id" element={user ? <Map /> : <Navigate to="/login" />} />
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