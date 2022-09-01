//action object  global
import Axios  from "axios";
import {API_URL} from '../../constants/API'

export const createAccountGlobal = ({fullName, username , email ,password}) => {
    return (dispatch) => {
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
    }
}