import "./Login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' 
import {loginUser} from '../../redux/actions/userAct'
import axios from "axios";
import { API_URL } from "../../constants/API";
import { useState } from "react";
// formik
import { useFormik } from "formik";
import * as Yup from "yup"
import YupPassword from "yup-password";
import { cekEmail } from "../../redux/actions/userAct";

function Forgot () {
    const [isUbah, setUbah] = useState(false)
    // configure yup
    YupPassword(Yup)

    const dispatch = useDispatch()

    const formik = useFormik ({
        initialValues : {
            email : "",
            password : ""
        },
        validationSchema: Yup.object().shape({
            email : Yup.string().required("harap masukan email dengan benar").email("Format yang dimasukan bukan email"),
            password: Yup.string().required("harap masukan password dengan benar").min(8).minUppercase(1).minNumbers(1).minSymbols(1)
        }),
        validateOnChange : false,
        onSubmit: (values) => {
            dispatch(cekEmail(values, formik.setSubmitting))
        }
    })

    // function cekEmail(values, setSubmitting) {
    //     axios.get(`${API_URL}/users`, {
    //         params: {
    //             email : values.email,
    //         }
    //     })
    //     .then((result) => {
    //         console.log(result.data[0]);
    //         setUbah(true)
    //     })
    //     .catch((err) => {
    //         alert(err)
    //     })
    //     setSubmitting(false)
    // }


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
                    <div className="form-login d-flex flex-column">
                        <div className="name">Forgot Password</div>
                        <div className="form-username d-flex flex-column">
                            {formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
                            {/* ternary option utk ketika salah pass / salah username */}                            
                            <label htmlFor="username">Username or email</label>
                            <input 
                            name="email" 
                            type="text" 
                            id="email" 
                            placeholder="Username or Email Address"
                            onChange={(event) => formik.setFieldValue("email" , event.target.value)} 
                            />
                        </div>
                        {/* ternary option utk munculkan password */}
                        {
                            isUbah ? 
                            <div className="form-password d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" id="password" placeholder="Password"/>
                            </div>                
                            :
                            null
                        }
                        {/* ternary option utk input */}
                        {
                            isUbah ?
                            <input
                            name="email" 
                            type="button" 
                            value="ubah password"
                            />
                            :
                            <input 
                            type="button" 
                            value="Cek Username/Password"
                            onChange={(event) => formik.setFieldValue("email" , event.target.value)}
                            onClick={formik.handleSubmit}
                            />
                        }
                        <div className="form-last d-flex flex-row justify-content-between">
                            <Link to="/">Sign In</Link>
                            <Link to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Forgot