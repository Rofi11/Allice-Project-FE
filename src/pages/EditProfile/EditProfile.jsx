import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector , connect } from 'react-redux';
import MyNavbar from '../../components/MyNavbar';
import "./EditProfile.css"
import axios from 'axios';
import { API_URL } from '../../constants/API';
import { userKeepLogin } from '../../redux/actions/userAct';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Component } from 'react';

function EditProfile () {
    const {username, fullName , bio, fotoProfile, id} = useSelector((state) => state.userReducer)

    const dispatch = useDispatch()

    const [editUsername, setEditUsername] = useState(username)
    const [editFullname, setEditFullname] = useState(fullName)
    const [editBio, setEditBio] = useState(bio)
    const [editfotoProfile, setEditFotoProfile] = useState(fotoProfile)
    const [edit, setEdit] = useState(0)

    function inputHandler (event, field) {
        const value = event.target.value

        if(field === "editUsername"){
            setEditUsername(value)
        } else if (field === "editFullname"){
            setEditFullname(value)
        } else if (field === "editBio"){
            setEditBio(value)
        } else if (field === "editFotoProfile"){
            setEditFotoProfile(value)
        }
    }

    function cancel () {
        setEdit(0)
    }

    function SaveBtnHandler () {
        axios.patch(`${API_URL}/users/${id}`, {
            username :editUsername,
            fullName: editFullname,
            bio :editBio,
            fotoProfile : editfotoProfile
        })
        .then((result) => {
            alert("berhasil mengubah data")
            dispatch(userKeepLogin(id))
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
                            <img src={fotoProfile} alt="" />
                        </div>
                        <div>
                            <div className='section2-edit-fotoProfile-name'>{username}</div>
                            <div className='section2-edit-fotoProfile-ubah'>Ubah Foto Profile</div>
                        </div>
                    </div>
                    <div className='section2-edit-nama d-flex my-2'>
                        <label htmlFor="name">Nama</label>
                        <input 
                        value={editFullname}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e ,"editFullname")} 
                        />
                    </div>
                    <div className='section2-edit-username d-flex my-2'>
                        <label htmlFor="username">UserName</label>
                        <input 
                        value={editUsername}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e, "editUsername")} 
                        />
                    </div>
                    <div className='section2-edit-bio d-flex my-2'>
                        <label htmlFor="Bio">Bio</label>
                        <input 
                        value={editBio}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e, "editBio")} 
                        />
                    </div>
                    <div className='section2-edit-bio d-flex my-2'>
                        <label htmlFor="fotoProfile">Foto Profile</label>
                        <input 
                        value={editfotoProfile}
                        type="text" 
                        className='form-control me-2' 
                        onChange={(e) => inputHandler(e, "editFotoProfile")} 
                        />
                    </div>
                    <button className='btn btn-primary mt-3' onClick={SaveBtnHandler}>Save</button>
                </div>
            </div>
            </div>
    )
}

export default EditProfile

// class EditProfile extends Component {
//     state = {
//         editId: `${this.props.userGlobal.id}`,
//         editUsername : `${this.props.userGlobal.username}`,
//         editFullname : `${this.props.userGlobal.fullName}`,
//         editFotoProfile : `${this.props.userGlobal.fotoProfile}`,
//         editBio : `${this.props.userGlobal.bio}`
//     }


//     //utk mengatasi inputan
//     inputHandler = (event) => {
//         const {name, value} = event.target

//         this.setState({[name] : value})
//         // console.log(this.state.editUsername);
//     }

//     SaveBtnHandler = () => {
//         axios.patch(`${API_URL}/users/${this.state.editId}`, {
//             username :this.state.editUsername,
//             fullName: this.state.editFullname,
//             bio :this.state.editBio,
//             fotoProfile : this.state.editFotoProfile
//         })
//         .then((result) => {
//             alert("berhasil mengubah data")
//         })
//         .catch((err) => {
//             alert(err)
//         })            
//     }

//     componentDidUpdate() {
//         this.props.userKeepLogin(this.state.editId)
//     }

//     render () {
//         return(
//             <div className=' bg bg-light'>
//             <MyNavbar/>
//             <div className='edit-profile row'>
//                 <div className='section1 col-4'>
//                     <div className="edit-profile-menu d-flex flex-column align-items-center">
//                         <div>Edit Profile</div>
//                         <div>Ubah Kata Sandi</div>
//                         <div>Aplikasi dan situs web</div>
//                         <div>Notifikasi email</div>
//                         <div>Notifikasi otomatis</div>
//                         <div>Kelola Kontak</div>
//                         <div>Privasi dan Keamanan</div>
//                         <div>Aktivitas login</div>
//                         <div>Email dari Instagram</div>
//                         <div>Bantuan</div>
//                         <div>Koleksi digital</div>
//                         <div>Beralih ke Akun Profesional</div>
//                     </div>
//                 </div>
//                 <div className='section2 col d-flex flex-column'>
//                     <div className='section2-edit-fotoProfile d-flex my-2'>
//                         <div className='section2-edit-image'>
//                             <img src={this.props.userGlobal.fotoProfile} alt="" />
//                         </div>
//                         <div>
//                             <div className='section2-edit-fotoProfile-name'>{this.props.userGlobal.username}</div>
//                             <div className='section2-edit-fotoProfile-ubah'>Ubah Foto Profile</div>
//                         </div>
//                     </div>
//                     <div className='section2-edit-nama d-flex my-2'>
//                         <label htmlFor="name">Nama</label>
//                         <input
//                         name='editFullname' 
//                         type="text" 
//                         className='form-control me-2' 
//                         onChange={this.inputHandler}
//                         // onChange={(e) => inputHandler( "editFullname")} 
//                         value={this.state.editFullname}
//                         />
//                     </div>
//                     <div className='section2-edit-username d-flex my-2'>
//                         <label htmlFor="username">UserName</label>
//                         <input 
//                         name='editUsername'
//                         type="text" 
//                         className='form-control me-2' 
//                         onChange={this.inputHandler}
//                         // onChange={(e) => inputHandler(e, "editUsername")} 
//                         value={this.state.editUsername}
//                         />
//                     </div>
//                     <div className='section2-edit-bio d-flex my-2'>
//                         <label htmlFor="Bio">Bio</label>
//                         <input 
//                         name='editBio'
//                         type="text" 
//                         className='form-control me-2' 
//                         onChange={this.inputHandler}
//                         // onChange={(e) => inputHandler(e, "editBio")} 
//                         value={this.state.editBio}
//                         />
//                     </div>
//                     <div className='section2-edit-bio d-flex my-2'>
//                         <label htmlFor="Bio">Foto Profile</label>
//                         <input 
//                         name='editFotoProfile'
//                         type="text" 
//                         className='form-control me-2' 
//                         onChange={this.inputHandler}
//                         // onChange={(e) => inputHandler(e, "editBio")} 
//                         value={this.state.editFotoProfile}
//                         />
//                     </div>
//                     <button className='btn btn-primary mt-3' onClick={this.SaveBtnHandler}>Save</button>
//                 </div>
//             </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         userGlobal : state.userReducer
//     }
// }

// const mapDispatchToProps = {
//     userKeepLogin
// }


// export default connect(mapStateToProps, mapDispatchToProps) (EditProfile)