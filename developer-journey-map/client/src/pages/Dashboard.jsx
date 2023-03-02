import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/dashboard.css";

const Dashboard = () => {
  const { uid } = useParams();
  const [maps, setMaps] = useState([]);

  const duplicateMap = async ({ _id }) => {
    const response = await fetch(`http://localhost:3800/api/maps/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: uid,
        lastModified: new Date()
      })
    });

    const copied = await response.json();
    setMaps([...maps, copied]);
  }

  const deleteMap = async ({ _id }) => {
    const response = await fetch(`http://localhost:3800/api/maps/${_id}`, {
      method: "DELETE"
    });

    const deletedMap = await response.json();
    setMaps(maps.filter(map => map._id !== deletedMap.result._id));
  }

  useEffect(() => {
    const loadMaps = async () => {
      const response = await fetch(`http://localhost:3800/api/maps/${uid}`);
      const maps = await response.json();

      setMaps(maps.data);
    };

    loadMaps();
  }, [maps, uid]);

  return (
    <div>
      <h2 id="title">Dashboard (Temporary)</h2>
      <div id="dashboard-flex-layout">
        {maps
          .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
          .map((map, index) => {
            return (
              <div key={index}>
                <Link to={`/map/${map._id}`} className="map-item">
                    <div>
                      <div>{map.title}</div>
                      <div>{new Date(map.lastModified).toLocaleString()}</div>
                      <div className="flex-buttons">
                        <button
                          className="button"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            duplicateMap(map);
                          }}
                        >
                          Copy
                        </button>
                        <button
                          className="button"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteMap(map);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {/* <FiMoreVertical id="more" /> */}
                </Link>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Dashboard;