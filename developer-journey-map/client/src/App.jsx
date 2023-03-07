import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map, Login, Dashboard } from "./pages";
import "./assets/styles/app.css";
import "./index.css";
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
            <Routes>
                <Route path="/login" element={user ? <Navigate to={`/dashboard/${user.id}`} /> : <Login />} />
                <Route path="/dashboard/:uid" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                {/* <Route path="/map/:id" element={user ? <Map /> : <Navigate to="/login" />} /> */}
                <Route path="/map/:id" element={<Map />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;