import "./Login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, Navigate} from 'react-router-dom'
import {connect} from 'react-redux' 
import {loginUser , loginV2} from '../../redux/actions/userAct'
import { Icon } from 'react-icons-kit'
import {view_off} from 'react-icons-kit/ikons/view_off'
import {view} from 'react-icons-kit/ikons/view'

class Login extends Component {
    state = {
        user_email: "",
        password: "",
        errMsg:"",
        type : "password",
        icon : view_off
    }

    handleToggle = () => {
        if(this.state.type === "password"){
            this.setState({
                type : "text",
                icon : view
            })
        } else {
            this.setState({
                type : "password",
                icon : view_off
            })
        }
    }

    //handler inputan
    inputHandler = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    render(){
        // setelah login akan masuk ke home page dan tidak bisa kembali ke login page
        if (this.props.userGlobal.idusers){
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
                            <label htmlFor="username">Username or Email</label>
                            <input name="user_email" className="input" onChange={this.inputHandler} type="text" id="user_email" placeholder="Username or Email Address" />
                        </div>
                            <div className="form-passwordxx d-flex flex-column">
                            <label htmlFor="password">Password</label>
                            <div className="form-passwordxx-toggle">
                                <input 
                                name="password" 
                                onChange={this.inputHandler} 
                                type={this.state.type} 
                                id="password" 
                                placeholder="Password"
                                className="input"
                                />
                                <span onClick={this.handleToggle}><Icon icon={this.state.icon} size={25}/></span>
                            </div>
                        </div>

                        <input type="button" value="Sign in" onClick={() => this.props.loginUser(this.state)} />

                        <div className="form-last d-flex flex-row justify-content-between">
                            <Link to="/forgot-password">Forgot Password?</Link>
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
    loginUser,
    loginV2
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)