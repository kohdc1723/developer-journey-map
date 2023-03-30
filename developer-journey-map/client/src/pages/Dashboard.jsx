import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/dashboard.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { uid } = useParams();
  const [maps, setMaps] = useState([]);
  const [user, setUser] = useState(null);


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
    setMaps([...maps, duplicate]);
  }

  const deleteMap = async ({ _id }) => {
    const response = await fetch(`http://localhost:3800/api/maps/${_id}`, {
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
    setMaps([...maps, createdMap]);
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
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const loadMaps = async () => {
      const response = await fetch(`http://localhost:3800/api/maps/${uid}`);
      const maps = await response.json();

      setMaps(maps.data);
    };

    loadMaps();
  }, [maps, uid]);

  return (
    <>
      <Navbar user={user} />
      <div className="main">
        <h2 id="title">Dashboard (Temporary)</h2>
        <div id="dashboard-flex-layout">
          <button
            className="map-item"
            onClick={(e) => {
              e.preventDefault();
              createMap(uid);
            }}
          >
              Create
          </button>

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
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;