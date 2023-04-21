import { logout } from "../services/firebase";
import LogoImage from '../assets/img/white_logo.png'

const Navbar = ({ user }) => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div>
                    <img src={LogoImage} alt="logoImage" className="logoImage" />
                </div>
                <div>
                    <a className="logo" href="/dashboard/:uid">Interactive Developer Journey Map</a>
                </div>
            </div>
            <div className="navbar-right">
                <div className="list">
                    <div className="profile">
                        <img className="profile-image" src={user?.auth?.currentUser?.photoURL} alt="profile" />
                        <div className="profile-name">{user.displayName}</div>
                    </div>
                    <div className="logoutButton" onClick={logout}>Sign Out</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar