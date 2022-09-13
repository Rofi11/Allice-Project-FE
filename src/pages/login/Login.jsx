import "./Login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, Navigate} from 'react-router-dom'
import {connect} from 'react-redux' 
import {loginUser} from '../../redux/actions/userAct'

class Login extends Component {
    state = {
        username: "",
        password: "",
        errMsg:""
    }

    //handler inputan
    inputHandler = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    render(){
        // setelah login akan masuk ke home page dan tidak bisa kembali ke login page
        if (this.props.userGlobal.id){
            return <Navigate to="/home"/>
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
                    <div className="form-login d-flex flex-column">
                        <div className="name">Sign in to Allice</div>
                        <div className="form-username d-flex flex-column">
                            {/* ternary option utk ketika salah pass / salah username */}
                            {
                                this.props.userGlobal.errMsg ? 
                                <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div> : null
                            }
                            <label htmlFor="username">Username</label>
                            <input name="username" onChange={this.inputHandler} type="text" id="username" placeholder="Username or Email Address" />
                        </div>
                            <div className="form-password d-flex flex-column">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={this.inputHandler} type="password" id="password"placeholder="Password"/>
                        </div>

                        <input type="button" value="Sign in" onClick={() => this.props.loginUser(this.state)} />

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

//ambil global state
const mapStateToProps = (state) => {
    return {
        userGlobal : state.userReducer
    }
}

// action object global
const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)