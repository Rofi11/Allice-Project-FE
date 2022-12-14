import "./SignUp.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Axios  from "axios";
import {API_URL} from '../../constants/API'
import {createAccountGlobal} from '../../redux/actions/userAct'
import {connect} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
//formik
import { useFormik } from "formik";
import * as Yup from 'yup'
import YupPassword from "yup-password";
import {useDispatch, useSelector} from "react-redux"
import { Icon } from 'react-icons-kit'
import {view_off} from 'react-icons-kit/ikons/view_off'
import {view} from 'react-icons-kit/ikons/view'
import { useState } from "react";


function SignUp () {
    const [iconChange , setIconChange] = useState(view_off)
    const [type , setType] = useState("password")
    const [iconChange2 , setIconChange2] = useState(view_off)
    const [type2 , setType2] = useState("password")

    const handleToggle = () => {
        if(type === "password"){
            setType("text")
            setIconChange(view)
        } else {
            setType("password")
            setIconChange(view_off)
        }
    }
    const handleToggle2 = () => {
        if(type === "password"){
            setType2("text")
            setIconChange2(view)
        } else {
            setType2("password")
            setIconChange2(view_off)
        }
    }
    // configure yup
    YupPassword(Yup)

    const {id} = useSelector((state) => state.userReducer)

    let nav = useNavigate()

    let dispatch = useDispatch()

    //formik initialliation
    const formik = useFormik({
        initialValues : {
            fullname : "",
            username : "",
            email : "",
            password : "",
            password2 : ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("harap masukan email").email("format yang dimasukan bukan email"),
            password: Yup.string().required("harap isi password").min(8).minUppercase(1).minNumbers(1).minSymbols(1),
            password2: Yup.string().required("harap isi password").min(8).minUppercase(1).minNumbers(1).minSymbols(1)
        }),
        validateOnChange : false,
        onSubmit: (values) => {
            // diisi oleh dispatch jika menggunakan global state
            dispatch(createAccountGlobal(values, formik.setSubmitting))
        }
    })

    if (id) {
        nav("/") // kalo ga daprt data, arahkan ke  / ==> login
    }
    return (
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
                            <label htmlFor="name">Fullname</label>
                            <input 
                            name="fullName" 
                            type="text" 
                            id="name" 
                            placeholder="fullname" 
                            className="input"
                            onChange={(event) => formik.setFieldValue("fullname", event.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                            <input 
                            name="username" 
                            type="text" 
                            id="username" 
                            className="input"
                            placeholder="Username"
                            onChange={(event) => formik.setFieldValue("username", event.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                                {formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
                            <input 
                            name="email"  
                            type="Email" 
                            id="Email" 
                            className="input"
                            placeholder="Email Address" 
                            onChange={(event) => formik.setFieldValue("email", event.target.value)}
                            />
                        </div>
                            <div className="form-password d-flex flex-column">
                                <div className="d-flex flex-column">
                                    <label htmlFor="password">Password</label>
                                    {formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
                                    <div className="form-password-border">
                                        <input 
                                        name="password"  
                                        type={type} 
                                        id="password" 
                                        className="input"
                                        placeholder="Password"
                                        onChange={(event) => formik.setFieldValue("password", event.target.value)}
                                        />
                                        <span onClick={handleToggle}> <Icon className=" icon" icon={iconChange}/> </span>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="re-password">Re-Password</label>
                                    {formik.errors.password2 ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
                                    <div className="form-password-border">
                                        <input 
                                        name="password2"  
                                        type={type2}
                                        id="re-password" 
                                        className="input"
                                        placeholder="Password"
                                        onChange={(event) => formik.setFieldValue("password2", event.target.value)}
                                        />
                                        <span onClick={handleToggle2}> <Icon className=" icon" icon={iconChange2}/> </span>
                                    </div>
                                </div>
                            </div>
                                    
                        <div className="checkBox d-flex flex-row ">
                            <input type="checkbox" name="confirm" id="confirm" />
                            <label htmlFor="confirm">Creating an account means you???re okay with our <a href="#">Terms of Service, Privacy Policy</a>, and our default <a href="#">Notification Settings.</a> </label>
                        </div>
                        <input type="button" value="Create Account" onClick={formik.handleSubmit}/>
                    </div>
                </div>
                <p className="back-login">Already Member? <Link to="/">Sign in</Link></p>
            </div>
        )
    }


export default SignUp