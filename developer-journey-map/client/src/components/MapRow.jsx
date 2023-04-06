import React from 'react';
import { Link } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { BsFillMapFill } from "react-icons/bs";
import { IconButton, Menu, MenuItem } from "@mui/material";

const MapRow = ({ map, uid, maps, setMaps }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
        setMaps([...maps, duplicate.result]);
    }

    const deleteMap = async (mapId) => {
        const response = await fetch(`http://localhost:3800/api/map/${mapId}`, {
            method: "DELETE"
        });

        const deletedMap = await response.json();
        setMaps(maps.filter(map => map._id !== deletedMap.result._id));
    }

    return (
        <React.Fragment>
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
                            id={`button-${map._id}`}
                            className="more-icon-cover"
                            aria-label="more"
                            aria-controls={open ? `menu-${map._id}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <FiMoreVertical />
                        </IconButton>
                        <Menu
                            id={`menu-${map._id}`}
                            aria-labelledby={`button-${map._id}`}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={(event, reason) => {
                                event.preventDefault();
                                if (reason === 'backdropClick') {
                                    setAnchorEl(null);
                                }
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
                                deleteMap(map._id);
                            }}
                        >
                            Delete
                        </button>
                    </div> */}
                </div>
            </Link>
        </React.Fragment>
    );
}

export default MapRow;
