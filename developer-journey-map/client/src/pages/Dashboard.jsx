import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
        <div>
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
    );
};

export default Dashboard;