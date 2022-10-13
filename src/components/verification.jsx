import { API_URL } from '../constants/API';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'
import { loginUser } from '../redux/actions/userAct';

function VerificationPage () {
    const dispatch = useDispatch()
    const [message , setMessage] = useState("Loading... \n Check Email Verification")

    // tangkep token yg dikirim dari app.js
    const {token} = useParams()
    console.log(token);

    const navigate = useNavigate()
    useEffect(() => {
        // ketika link ini dijalankan atau di buka melalui link yg ada pada email, ini akan mentriger utk menjalankan/mengakses api backend dan 'unverified' ke 'verified'
        axios.patch(`${API_URL}/users/verified` , {} , {
            // parameter ke 3 nya headers
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            setMessage("Your Account Verified")
            dispatch({
                type : "USER_LOGIN",
                payload : res.data[0]
            })
            // mengirim ke page utama, dng pandding 2 detik
            setTimeout(() => {
                navigate("/home")
            }, 2000)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className='d-flex justify-content-center mt-3'>
            <h2>{message}</h2>
        </div>
    )
}

export default VerificationPage