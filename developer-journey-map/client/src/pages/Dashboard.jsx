import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/dashboard.css";

const Dashboard = () => {
  const { uid } = useParams();
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const loadMaps = async () => {
      const response = await fetch(`http://localhost:3800/api/maps/${uid}`);
      const maps = await response.json();

      setMaps(maps.data);
    };

    loadMaps();
  });

  return (
    <div>
      <h2 id="title">Dashboard (Temporary)</h2>
      <div id="dashboard-flex-layout">
        {maps
          .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
          .map((map) => {
          return (
            <Link to={`/map/${map._id}`}>
              <div className="map">
                <div>{map.title}</div>
                <div>{new Date(map.lastModified).toLocaleString()}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;