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
    const [message , setMessage] = useState("Loading...")

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
            console.log(res.data);
            // mengirim ke page utama, dng pandding 2 detik
            setTimeout(() => {
                navigate("/")
            }, 2000)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

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
                    <h2>{message}</h2>
                    <h2>Check your Email Account for verified Account</h2>
                </div>
            </div>
        </div>
    )
}

export default VerificationPage