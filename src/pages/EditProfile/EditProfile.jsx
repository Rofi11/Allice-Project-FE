import React from 'react';
import { useState , useEffect, useRef } from 'react';
import { useDispatch, useSelector , connect } from 'react-redux';
import MyNavbar from '../../components/MyNavbar';
import "./EditProfile.css"
import axios from 'axios';
import { API_URL } from '../../constants/API';
import { userKeepLogin } from '../../redux/actions/userAct';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Component } from 'react';
import {Avatar} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function EditProfile () {
    const {username, fullname , bio, fotoProfile, id,} = useSelector((state) => state.userReducer)
    // console.log(id);

    const dispatch = useDispatch()

    const nav = useNavigate()

    const [editUsername, setEditUsername] = useState(username)
    const [editFullname, setEditFullname] = useState(fullname)
    const [editBio, setEditBio] = useState(bio)
    const [editfotoProfile, setEditFotoProfile] = useState(fotoProfile)
    const [editfilename, setEditFileName] = useState("")
    const [edit, setEdit] = useState(0)
    const inputFileRef = useRef(null);
    // console.log(editfotoProfile);

    function inputHandler (event, field) {
        const value = event.target.value

        if(field === "editUsername"){
            setEditUsername(value)
        } else if (field === "editFullname"){
            setEditFullname(value)
        } else if (field === "editBio"){
            setEditBio(value)
        }
    }

    // handler button add browser
    const BtnAddFile = (e) => {
        if (e.target.files[0]) {
            setEditFileName(e.target.files[0].name)
            setEditFotoProfile(e.target.files[0])
            let preview = document.getElementById("imgpreview2")
            preview.src = URL.createObjectURL(e.target.files[0])
        }
    }

    function cancel () {
        setEdit(0)
    }

    function SaveBtnHandler () {
        // kirim dalam bentuk form
        const formData = new FormData()

        // configurasi jika foto profile dari kosong
        let foto
        // split dulu foto nya
        if (fotoProfile != null){
            foto = fotoProfile.split("/")[4]
        }


        formData.append("fullname" , editFullname)
        formData.append("username" , editUsername)
        formData.append("image" , editfotoProfile) //foto baru
        formData.append("bio", editBio)
        formData.append("id", id)
        if(fotoProfile != null){
            formData.append("old_image", foto)
        }

        axios.patch(`${API_URL}/users/edit-profile/${id}`, formData)
        .then((result) => {
            alert("berhasil menambahkan data")
            // dispatch(userKeepLogin(idusers))
            cancel()
        })
        .catch((err) => {
            alert(err)
        })            
    }


    return(
        <div className=' bg bg-light'>
            <MyNavbar/>
            <div className='edit-profile row'>
                <div className='section1 col-4'>
                    <div className="edit-profile-menu d-flex flex-column align-items-center">
                        <div>Edit Profile</div>
                        <div>Ubah Kata Sandi</div>
                        <div>Aplikasi dan situs web</div>
                        <div>Notifikasi email</div>
                        <div>Notifikasi otomatis</div>
                        <div>Kelola Kontak</div>
                        <div>Privasi dan Keamanan</div>
                        <div>Aktivitas login</div>
                        <div>Email dari Instagram</div>
                        <div>Bantuan</div>
                        <div>Koleksi digital</div>
                        <div>Beralih ke Akun Profesional</div>
                    </div>
                </div>
                <div className='section2 col d-flex flex-column'>
                    <div className='section2-edit-fotoProfile d-flex my-2'>
                        <div className='section2-edit-image'>
                            {/* <img src={fotoProfile} alt="" /> */}
                            <Avatar name='' src={fotoProfile}/>
                        </div>
                        <div>
                            <div className='section2-edit-fotoProfile-name'>{username}</div>
                            <div className='section2-edit-fotoProfile-ubah' onClick={() => inputFileRef.current.click()}>Ubah Foto Profile</div>
                        </div>
                    </div>
                    <div className='section2-edit-nama d-flex my-2'>
                        <label htmlFor="name">Nama</label>
                        <input 
                        defaultValue={editFullname}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e ,"editFullname")} 
                        />
                    </div>
                    <div className='section2-edit-username d-flex my-2'>
                        <label htmlFor="username">UserName</label>
                        <input 
                        defaultValue={editUsername}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e, "editUsername")} 
                        />
                    </div>
                    <div className='section2-edit-bio d-flex my-2'>
                        <label htmlFor="Bio">Bio</label>
                        <input 
                        defaultValue={editBio}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e, "editBio")} 
                        />
                    </div>
                    <div className='section2-edit-bio d-flex my-2'>
                        {/* input ini akan mneghilang karna di hubungkan oleh inputFileRef ke button ubah foto Profile */}
                        <input 
                        accept='image/png , image/jpg, image/jpeg'
                        type="file" 
                        className='form-control me-2' 
                        style={{height: "max-content"}}
                        onChange={(e) => BtnAddFile(e)} 
                        ref={inputFileRef}
                        hidden = "hidden"
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="col-md-3">
                            <img id="imgpreview2" width="100%"/>
                        </div>
                    </div>
                    <button className='btn btn-primary mt-3' onClick={SaveBtnHandler}>Save</button>
                </div>
            </div>
            </div>
    )
}

export default EditProfile

