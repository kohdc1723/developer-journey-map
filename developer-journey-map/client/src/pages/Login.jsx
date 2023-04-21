import React from 'react';
import { signInWithGoogle, signInWithGithub } from "../services/firebase";

import Google from '../assets/img/google.png'
import Github from '../assets/img/github.png'
import LoginImage from '../assets/img/login.png'
import Logo from '../assets/img/logo.png'
import "../assets/styles/login.css"

const Login = ({ user, setUser }) => {
    const handleGoogleLogin = async () => {
        const user = await signInWithGoogle();
        console.log(user.uid);

        if (user) setUser(user);
    };

    const handleGithubLogin = async () => {
        const user = await signInWithGithub();
        console.log(user.uid);

        if (user) setUser(user);
    };

    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='left'>
                    <div className='intro'>
                        <h1>Revere Communications</h1>
                        <p>We aim to improve the experience developers go through in discovering and building
                            with new tools by creating an online interactive version of our Developer Journey Map.</p>
                        <button><a href="https://www.reverecommunications.com/about">LEARN MORE</a></button>
                    </div>
                    <img src={LoginImage} alt="" />
                    <a className='copyright' href="https://storyset.com/nature">Nature illustrations by Storyset</a>
                </div>
                <div className='right'>
                    <div className='companyLogo'>
                        <h1 className='logoName'>DevRel.Agency</h1>
                        <img className='logoImg' src={Logo} alt="" />
                    </div>
                    <h1 className='loginTitle'>Welcome Back</h1>
                    <h1 className='loginSubtitle'><span>CONTINUE WITH</span></h1>
                    <div className='loginButton google' onClick={handleGoogleLogin}>
                        <img src={Google} alt="" className='icon' />
                        Google
                    </div>
                    <div className='loginButton github' onClick={handleGithubLogin}>
                        <img src={Github} alt="" className='icon gh' />
                        Github
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login