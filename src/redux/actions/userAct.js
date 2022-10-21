//action object  global
import Axios  from "axios";
import {API_URL} from '../../constants/API'
import customer from "../../assets/image/iconsAllice/customer.png"
import axios from "axios";
import { Navigate, useNavigate ,} from "react-router-dom";

export const createAccountGlobal = (values, setSubmitting) => {
    return async function (dispatch) {
        try {
            if(values.password == values.password2){
                await Axios.post(`${API_URL}/users/register` , {
                    fullname : values.fullname,
                    username : values.username,
                    email : values.email,
                    password : values.password,
                    role : "user",
                    fotoProfile: "",
                    bio : "",
                    status : "unverified"
                })
                .then((result) => {
                    console.log(result.data);
                    //hapus pass agar tidak bisa diliha/ diakses org lain
                    delete result.data.password
                    // yg dikirim sudah tidak memiliki password
                    dispatch({
                        type: "USER_LOGIN",
                        payload : result.data
                    })
                    alert("Berhasil mendaftarkan user")
                    alert("Check Your Email Verification")
                })
                .catch((err) => {
                    alert(err)
                })
            } else {
                alert("kata sandi tidak sesuai, cek kembali kata sandi")
            }
            
            setSubmitting(false)
        } catch (error){
            alert(error)
            setSubmitting(false)
        }
    }
}

// tidak dipakai karena authorization pakai post di contoh nya, ada di bawah loginV2, hasil nya sama saja, bug ya pun sama, bebas pakai yg mana nya
export const loginUser = ({user_email, password}) => { 
    return (dispatch) => {
        Axios.get(`${API_URL}/users/get`, { // pakai method get
            params:{
                user_email:user_email,
                password : password
            }
        })
        .then((result) => {
            console.log(result.data.dataLogin); //dikirm dalam bentuk object di data login
            if(result.data.dataLogin) {
                if(result.data.dataLogin.status === "verified"){
                    //delete pass dulu, agar tidak tersimpan di localstorage maupun di global state
                    delete result.data.password
                    // console.log(result.data[0]);

                    localStorage.setItem("UserDataAllice", JSON.stringify(result.data.dataLogin))
                    console.log("test");
                    dispatch({
                        type : "USER_LOGIN",
                        payload :result.data.dataLogin
                    })
                } else {
                    //handle wrong password
                    dispatch({
                        type : "USER_ERROR",
                        payload : "Wrong password"
                    })
                }
            } else {
                //handle user not found
            dispatch({
                    type : "USER_ERROR",
                    payload : result.data.message,
                    
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const logoutUser = () => {
    localStorage.removeItem("UserDataAllice")
    return {
        type : "USER_LOGOUT",
    }
}

export const userKeepLogin = (userData) => {
    // console.log(userData.id);
    return (dispatch) => {
        Axios.get(`${API_URL}/users/userKeepLogin`, {
            params: {
                id: userData.id
            }
        })
        .then((result) => {
            // console.log(result.data);
            // agar data yg di ambil selalu terbaru
            delete result.data[0].password
            localStorage.setItem("UserDataAllice" , JSON.stringify(result.data[0]))

            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE",
    }
}


//login pakai metode (post) authorization seperti contoh, ini jalan, hanya yg wrong password tidak jalan, sama seperti yg loginUser diatas
export const loginV2 = ({user_email, password}) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users/getV2`, {  // pakai method post
            user_email:user_email,
            password : password
        })
        .then((result) => {
            console.log(result.data); //dikirm dalam bentuk object di data login
            if(result.data.dataLogin) {
                if(result.data.dataLogin.status == "verified"){
                    //delete pass dulu, agar tidak tersimpan di localstorage maupun di global state
                    delete result.data.password
                    // console.log(result.data[0]);

                    localStorage.setItem("UserDataAllice", JSON.stringify(result.data.dataLogin))
                    dispatch({
                        type : "USER_LOGIN",
                        payload :result.data.dataLogin
                    })
                } else {
                    //handle wrong password
                    dispatch({
                        type : "USER_ERROR",
                        payload : "Wrong Password"
                    })
                }
            } else {
                //handle user not found
            dispatch({
                    type : "USER_ERROR",
                    // payload : "User Not Found",
                    payload : result.data.message,
                    
                })
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                    type : "USER_ERROR",
                    payload : "User Not Found",
                    // payload : result.data.message,
                    
                })
        })
    }
}

// utk forgot
export const cekEmail = (values, setSubmitting) => {
    return async function (dispatch) {
        try {
        await Axios.get(`${API_URL}/users`, {
            params:{
                email : values.email,
            }
        })
        .then((result) => {
            console.log(result.data[0]);
            dispatch({
                type : "USER_LOGIN",
                payload :result.data[0]
            })
        })
        .catch((err) => {
            alert(err)
        })

            setSubmitting(false)
        } catch (error){
            alert(error)
            setSubmitting(false)
        }
    }
}