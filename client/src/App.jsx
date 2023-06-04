import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Map, Login, Dashboard } from "./pages";
import { auth } from "../src/services/firebase";
import "./assets/styles/app.css";
import "./index.css";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        });
    }, [user]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user ?
                        <Navigate to={`/dashboard/${user.uid}`} /> : 
                        <Login user={user} setUser={setUser}/>
                    }
                />
                <Route
                    path="/dashboard/:uid"
                    element={user ? <Dashboard user={user} /> : <Navigate to={`/`} />}
                />
                <Route
                    path="/map/:id"
                    element={user ? <Map user={user} /> : <Navigate to={`/`} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;