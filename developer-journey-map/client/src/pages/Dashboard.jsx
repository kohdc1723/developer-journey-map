import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../assets/styles/dashboard.css";
import "../assets/styles/app.css";
import defaultMapImage from "../assets/img/map.jpg";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapRow } from "../components";

const Dashboard = () => {
    const { uid } = useParams();
    const [maps, setMaps] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const createMap = async (uid) => {
        const response = await fetch(`http://localhost:3800/api/map/${uid}`, {
            method: "POST"
        });

        const createdMap = await response.json();
        setMaps([...maps, createdMap.data]);

        return createdMap.data;
    };

    const handleCreate = async (uid) => {
        const createdMap = await createMap(uid);
        console.log(createdMap)
        navigate(`/map/${createdMap._id}`);
    };

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
        })};

        getUser();
    }, []);

    // all maps which the logged-in user created will be loaded once right after tha dashboard page is rendered
    useEffect(() => {
        const loadAllMapsOfUser = async () => {
            const response = await fetch(`http://localhost:3800/api/maps/${uid}`);
            const maps = await response.json();

            setMaps(maps.data);
        };

        loadAllMapsOfUser();
    }, [uid]);

    return (
        <React.Fragment>
            <Navbar user={user} />

            <div id="dashboard" className="main dashboard">
                <h2 className="create-title">Start a new map</h2>
                <div className="create-container">
                    <div
                        className="create-template"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCreate(uid);
                        }}
                    >
                        <img src={defaultMapImage} alt="default map" width={250} />
                        <div className="create-subtitle">Create a default map</div>
                    </div>
                </div>

                <div className="label">
                    <div></div>
                    <div className="title-column">Title</div>
                    <div className="last-modified-column">Last modified</div>
                    <div></div>
                </div>

                {maps
                    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
                    .map((map, index) => (
                        <MapRow key={map._id} map={map} uid={uid} maps={maps} setMaps={setMaps} />
                    ))
                }
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
