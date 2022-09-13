//action object  global
import Axios  from "axios";
import {API_URL} from '../../constants/API'

export const createAccountGlobal = ({fullName, username , email ,password, password2}) => {
    return (dispatch) => {
        if(password == password2){
            Axios.post(`${API_URL}/users` , {
                fullName,
                username,
                email,
                password,
                role : "user"
            })
            .then((result) => {
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
    }
}

export const loginUser = ({username, password}) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params:{
                username:username,
            }
        })
        .then((result) => {
            // console.log(result.data); //hasilnya bentuk array
            if(result.data.length) {
                if(password === result.data[0].password){
                    //delete pass dulu, agar tidak tersimpan di localstorage maupun di global state
                    delete result.data[0].password

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
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id : userData.id
            }
        })
        .then((result) => {
            // agar data yg di ambil selalu terbaru
            delete result.data[0].password
            localStorage.setItem("UserDataAllice" , JSON.stringify(result.data[0]))

            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE",
    }
}

export const btnHandlerAdd = () => {
    return {
        type: "CHECK_IS_ADD"
    }
}
export const btnHandlerClose = () => {
    return {
        type: "CHECK_IS_CLOSE"
    }
}