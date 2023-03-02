import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
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

    const { uid } = useParams();
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        const loadMaps = async () => {
            const response = await fetch(`http://localhost:3800/api/maps/${uid}`);
            const maps = await response.json();

            setMaps(maps.data);
        }
        // execute
        loadMaps();
    });

    return (
        <>
            <Navbar user={user} />
            <div className="main">
                <h2>Dashboard</h2>
                <div className="flex">
                    {maps.map(map => {
                        return (
                            <Link to={`/map/${map._id}`}>
                                <div className="w-20 h-20 bg-slate-300">{map.title}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;