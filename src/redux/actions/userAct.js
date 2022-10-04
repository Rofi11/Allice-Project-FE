//action object  global
import Axios  from "axios";
import {API_URL} from '../../constants/API'
import customer from "../../assets/image/iconsAllice/customer.png"
import axios from "axios";

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
                    fotoProfile: {customer},
                    bio : "",
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
                })
                .catch((err) => {
                    alert(err)
                })
            } else {
                alert("password tidak singkron")
            }

            setSubmitting(false)
        } catch (error){
            alert(error)
            setSubmitting(false)
        }
    }
}

export const loginUser = ({user_email, password}) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users/get`, {
            params:{
                user_email:user_email,
                password : password
            }
        })
        .then((result) => {
            // console.log(result.data); //hasilnya bentuk array
            if(result.data.length) {
                if(password === result.data[0].password){
                    //delete pass dulu, agar tidak tersimpan di localstorage maupun di global state
                    delete result.data[0].password
                    // console.log(result.data[0]);

                    localStorage.setItem("UserDataAllice", JSON.stringify(result.data[0]))
                    dispatch({
                        type : "USER_LOGIN",
                        payload :result.data[0]
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
                    payload : "User Not Found"
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
        type : "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    // console.log(userData);
    return (dispatch) => {
        Axios.get(`${API_URL}/users/userKeepLogin`, {
            params: {
                idusers : userData.idusers
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

//utk forgot
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