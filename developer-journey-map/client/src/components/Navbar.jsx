import { Link } from "react-router-dom"
import LoginImage from '../assets/img/user.png'
import LogoImage from '../assets/img/white_logo.png'

const Navbar = ({ user }) => {

    const logout = () => {
        window.open("http://localhost:3800/auth/logout", "_self");
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div>
                    <img src={LogoImage} alt="logoImage" className="logoImage" />
                </div>
                <div>
                    <a className="logo" href={`http://localhost:3000/dashboard/${user.id}`}>Interactive Developer Journey Map</a>
                </div>
            </div>
            <div className="navbar-right">
                {user ? (
                    <ul className="list">
                        <li className="listItem">
                            {user.photos.length > 0 ? (
                                <img src={user.photos[0].value} referrerPolicy="no-referrer" alt="" className="avatar" />
                            ) : (
                                <img src={LoginImage} alt="" className="avatar" />
                            )}
                        </li>
                        <li className="listItem">{user.displayName}</li>
                        <li className="listItem" onClick={logout}>Logout</li>
                    </ul>
                ) : (<Link to="/login">Login</Link>)}
            </div>
        </div>
    )
}

export default Navbar