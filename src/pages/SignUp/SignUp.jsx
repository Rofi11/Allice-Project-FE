import "./SignUp.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Axios  from "axios";
import {API_URL} from '../../constants/API'
import {createAccountGlobal} from '../../redux/actions/userAct'
import {connect} from 'react-redux'
import {Link, Navigate} from 'react-router-dom'


class SignUp extends Component {
    state={
    username: "",
    fullName: "",
    email: "",
    password:"",
    password2:""
    }

    //handler inputan username
    inputHandler = (event) =>{
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    // handler button create account, utk test saja, karna asli nya akan pakai action global
    createAccountHandler = () => {
        // alert(`fullname : ${this.state.fullName}\nusername : ${this.state.username}\nemail : ${this.state.email}\npassword : ${this.state.password}\nre-password : ${this.state.password2} `)
        const {fullName, username , email ,password} = this.state
        Axios.post(`${API_URL}/users` , {
            fullName,
            username,
            email,
            password,
            role : "user"
        })
        .then(() => {
            alert("Berhasil mendaftarkan user")
        })
        .catch((err) => {
            alert(err)
        })
    }

    render(){
        // ksetika sudah mendaftar akan langsung di arahkan ke hom page
        if(this.props.userGlobal.id){
            return <Navigate to="/"/>
        }
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
                    <div className="form-signUp d-flex flex-column">
                        <div className="name">Sign Up to Allice</div>
                        <div className="form-username d-flex flex-column">
                            <label htmlFor="name">Full name</label>
                            <input name="fullName" onChange={this.inputHandler} type="text" id="name" placeholder="fullName" />
                            <label htmlFor="username">Username</label>
                            <input name="username" onChange={this.inputHandler} type="text" id="username" placeholder="Username" />
                            <label htmlFor="email">Email</label>
                            <input name="email" onChange={this.inputHandler} type="Email" id="Email" placeholder="Email Address" />
                        </div>
                            <div className="form-password d-flex flex-column">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={this.inputHandler} type="password" id="password"placeholder="Password"/>
                            <label htmlFor="re-password">Re-Password</label>
                            <input name="password2" onChange={this.inputHandler} type="password" id="re-password"placeholder="Password"/>
                        </div>

                        <div className="checkBox d-flex flex-row ">
                            <input type="checkbox" name="confirm" id="confirm" />
                            <label htmlFor="confirm">Creating an account means you’re okay with our <a href="#">Terms of Service, Privacy Policy</a>, and our default <a href="#">Notification Settings.</a> </label>
                        </div>
                        <input type="button" value="Create Account" onClick={() => this.props.createAccountGlobal(this.state)} />
                    </div>
                </div>
                <p className="back-login">Already Member? <Link to="/login">Sign in</Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal : state.userReducer
    }
}

const mapDispatchToProps = {
    createAccountGlobal
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)