import "./login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link} from 'react-router-dom'

class Login extends Component {
    state={
        biodata: [],
        inputUsername: "",
        inputPassword: ""
    }

    // button login
    fnSignin(){
        alert("tombol sign-in")
    }
    //handler inputan username
    inputHandlerUsername = (event) =>{
        this.setState({
            inputUsername: event.target.value
        })
    }

    //handler inputan username
    inputHandlerPassword= (event) =>{
        this.setState({
            inputPassword: event.target.value
        })
    }


    render(){
        return(
            <div className="container-utama d-flex">
                {/* bagian gambar */}
                <div className="section-gambar d-flex flex-column">
                    <div className="allice">
                        <div className="name-allice">Allice</div>
                        <div className="enjoy">Allice Help you Connect and Share with the People in your life</div>
                    </div>
                    
                </div>

                {/* bagian-form-login  */}
                <div className="section-login d-flex justify-content-center">
                    {/* form */}
                    <div className="form-login d-flex flex-column">
                        <div className="name">Sign in to Allice</div>
                        <div className="form-username d-flex flex-column">
                            <label for="username">Username or Email Address</label>
                            <input onChange={this.inputHandlerUsername} type="text" id="username" placeholder="Username or Email Address" />
                        </div>
                            <div className="form-password d-flex flex-column">
                            <label for="password">Password</label>
                            <input onChange={this.inputHandlerPassword} type="password" id="password"placeholder="Password"/>
                        </div>

                        <input type="button" value="Sign in" onClick={this.fnSignin} />

                        <div className="form-last d-flex flex-row justify-content-between">
                            <a href="#">Forgot Password?</a>
                            <Link to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login