import React from 'react'
import Google from '../img/google.png'
import Github from '../img/github.png'
import Linkedin from '../img/linkedin.png'
import LoginImage from '../img/login.png'
import Logo from '../img/logo.png'
import "../login.css"

const Login = () => {

    const google = () => {
        window.open("http://localhost:3800/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:3800/auth/github", "_self");
    };

    const linkedin = () => {
        window.open("http://localhost:3800/auth/linkedin", "_self");
    };

    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='left'>
                    <div className='intro'>
                        <h1>Revere Communications</h1>
                        <p>We aim to improve the experience developers go through in discovering and building
                            with new tools by creating an online interactive version of our Developer Journey Map.</p>
                        <button>LEARN MORE</button>
                    </div>
                    <img src={LoginImage} alt="" />
                    <a href="https://storyset.com/nature">Nature illustrations by Storyset</a>
                </div>
                <div className='right'>
                    <div className='companyLogo'>
                        <h1 className='logoName'>DevRel.Agency</h1>
                        <img className='logoImg' src={Logo} alt="" />
                    </div>
                    <h1 className='loginTitle'>Welcome Back</h1>
                    <h1 className='loginSubtitle'><span>CONTINUE WITH</span></h1>
                    <div className='loginButton google' onClick={google}>
                        <img src={Google} alt="" className='icon' />
                        Google
                    </div>
                    <div className='loginButton github' onClick={github}>
                        <img src={Github} alt="" className='icon gh' />
                        Github
                    </div>
                    <div className='loginButton linkedin' onClick={linkedin}>
                        <img src={Linkedin} alt="" className='icon li' />
                        Linkedin
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login