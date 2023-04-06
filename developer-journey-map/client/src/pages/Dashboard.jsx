import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
import { FiMoreVertical } from "react-icons/fi";
import { BsFillMapFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { IconButton, Menu, MenuItem, Backdrop } from "@mui/material";
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

import "react-confirm-alert/src/react-confirm-alert.css";
import "../assets/styles/dashboard.css";
import "../assets/styles/app.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const { uid } = useParams();
    const [maps, setMaps] = useState([]);
    const [user, setUser] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // const handleClickDelete = (mapId) => {
    //     confirmAlert({
    //         message: "Are you sure to delete this map?",
    //         buttons: [
    //             {
    //                 label: "Delete",
    //                 style: {
    //                     backgroundColor: "red"
    //                 },
    //                 onClick: () => deleteMap(mapId)
    //             },
    //             {
    //                 label: "Cancel"
    //             }
    //         ]
    //     });
    // };

    const duplicateMap = async ({ _id }) => {
        const response = await fetch(`http://localhost:3800/api/map/duplicate/${_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: uid,
                lastModified: new Date()
            })
        });

        const duplicate = await response.json();
        setMaps(maps.unshift(duplicate.result));
    }

    const deleteMap = async (mapId) => {
        const response = await fetch(`http://localhost:3800/api/maps/${mapId}`, {
            method: "DELETE"
        });

        const deletedMap = await response.json();
        setMaps(maps.filter(map => map._id !== deletedMap.result._id));
    }

    const createMap = async (uid) => {
        const response = await fetch(`http://localhost:3800/api/map/${uid}`, {
            method: "POST"
        });

        const createdMap = await response.json();
        console.log("c: " + createdMap.data._id)
        setMaps(maps.unshift(createdMap.data));
    }

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
                <div className="label">
                    <div></div>
                    <div className="title-column">Title</div>
                    <div className="last-modified-column">Last modified</div>
                    <div></div>
                </div>

                <div className="create-row">
                    <AiFillPlusCircle
                        className="create-button"
                        onClick={(e) => {
                            e.preventDefault();
                            createMap(uid);
                        }}
                    />
                </div>

                {maps
                    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
                    .map((map, index) => (
                        <div key={index}>
                            <Link to={`/map/${map._id}`} className="map-item">
                                <div className="grid-container">
                                    <div>
                                        <BsFillMapFill className="map-icon" />
                                    </div>
                                    <div className="title-column">
                                        {map.title}
                                    </div>
                                    <div className="last-modified-column">
                                        {new Date(map.lastModified).toLocaleString()}
                                    </div>
                                    <div className="more">
                                        <IconButton
                                            className="more-icon-cover"
                                            aria-label="more"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <FiMoreVertical />
                                        </IconButton>
                                        <Menu
                                            // id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            onBackdropClick={handleClose}
                                        >
                                            <MenuItem onClick={(e) => {
                                                e.preventDefault();
                                                duplicateMap(map);
                                                setAnchorEl(null);
                                            }}>
                                                Duplicate
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                e.preventDefault();
                                                console.log(map._id)
                                                deleteMap(map._id);
                                                setAnchorEl(null);
                                            }}>
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    {/* <div style={{display: "flex"}}>
                                        <button
                                            className="button"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                duplicateMap(map);
                                            }}
                                        >
                                            Duplicate
                                        </button>
                                        <button
                                            className="button"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClickDelete(map._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div> */}
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
