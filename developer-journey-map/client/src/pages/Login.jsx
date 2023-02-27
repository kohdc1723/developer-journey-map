import React from 'react'
import Google from '../img/google.png'
import Github from '../img/github.png'
import Linkedin from '../img/linkedin.png'
import LoginImage from '../img/login.png'

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
                    <img src={LoginImage} alt="" />
                </div>
                <div className="center">
                    <div className="line" />
                </div>
                <div className='right'>
                    <h1 className='loginTitle'>Create your jouney map now!</h1>
                    <div className='loginButton google' onClick={google}>
                        <img src={Google} alt="" className='icon' />
                        Sign in with Google
                    </div>
                    <div className='loginButton github' onClick={github}>
                        <img src={Github} alt="" className='icon gh' />
                        Sign in with Github
                    </div>
                    <div className='loginButton linkedin' onClick={linkedin}>
                        <img src={Linkedin} alt="" className='icon li' />
                        Sign in with Linkedin
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login