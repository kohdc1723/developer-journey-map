import { Link } from "react-router-dom"
import LoginImage from '../assets/img/user.png'

const Navbar = ({ user }) => {

    const logout = () => {
        window.open("http://localhost:3800/auth/logout", "_self");
    };

    return (
        <div className="navbar">
            <span className="logo">Interactive Developer Journey Map</span>
            {user ? (
                <ul className="list">
                    <li className="listItem">
                        {user.photos.length > 0 ? (
                            <img src={user.photos[0].value} alt="" className="avatar" />
                        ) : (
                            <img src={LoginImage} alt="" className="avatar" />
                        )}
                    </li>
                    <li className="listItem">{user.displayName}</li>
                    <li className="listItem" onClick={logout}>Logout</li>
                </ul>
            ) : (<Link to="/login">Login</Link>)}
        </div>
    )
}

export default Navbar