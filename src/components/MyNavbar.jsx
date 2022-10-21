import {Navbar, Nav ,NavItem , UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Link, Navigate, useNavigate} from 'react-router-dom'

import compas from "../assets/image/iconsAllice/compas.png"

import heart from "../assets/image/iconsAllice/heart.png"
import add from "../assets/image/iconsAllice/add.png"
import message from "../assets/image/iconsAllice/message.png"
import home from "../assets/image/iconsAllice/home.png"
import "../assets/styles/MyNav.css"
import axios from 'axios';
import { API_URL } from '../constants/API';
import {Avatar} from '@chakra-ui/react'
//redux
import { useState , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function MyNavBar () {
    // buat state nya
    const [modal , setModal] = useState(false)

    const [caption, setCaption] = useState("")
    const [previewFoto , setPrevieFoto] = useState(true)
    const [addFile , setAddFile] = useState(null)
    const [addFileName, setAddFileName] = useState("")
    const inputFileRef = useRef(null)

    const toggle = () => setModal(!modal)

    // ambil glbal state
    const {username, fullname, fotoProfile, id } = useSelector (state => state.userReducer)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const inputHandler = (e, field) => {
        const {value} = e.target
        if(field === "caption"){
            setCaption(value)
        }
    }

    const onBtnAddFile = (e) => {
        if (e.target.files[0]){
            setAddFile(e.target.files[0])
            setAddFileName(e.target.files[0].name)
            setPrevieFoto(false)

            let preview = document.getElementById("imgpreview")
            preview.src = URL.createObjectURL(e.target.files[0])
        }
    }

    const btnBagikanHandler = () => {
        const d = new Date()
        //pengkondisian jika data file ada
        if(addFile){
            let formData = new FormData()

            formData.append('caption', caption)
            formData.append('created_date', `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`)
            formData.append('image', addFile)
            formData.append('usersId', id)

            // kirimkan data
            axios.post(`${API_URL}/post/upload`, formData)
            .then((res) => {
                console.log(res.data);
                alert("berhasil upload file")
                setModal(false)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const logoutUser2 = () => {
        localStorage.removeItem("UserDataAllice")
        dispatch({
            type : "USER_LOGOUT"
        })
        navigate("/")
    }

    return (
        <div className='background-behind'>
            <Navbar className='containerx row'>
                    <NavbarBrand >
                        <em className='logo'>Allice</em>
                    </NavbarBrand>
                    <Nav> 
                        <NavItem className='search d-none d-sm-none d-md-none d-lg-none d-xl-block col-xl-4'>
                            <NavbarText><input type="text" className='form-control' placeholder='Search'/></NavbarText>
                        </NavItem>
                        <NavItem className='me-3 m-2'>
                            <NavbarText>Hello, {username}</NavbarText>
                        </NavItem>
                        <NavItem className='icon me-3 m-2'>
                            <NavbarText>
                                <Link to="/home"><img src={home} alt="" /></Link>
                            </NavbarText>
                        </NavItem>
                        <NavItem className='icon me-3 m-2'>
                            <NavbarText><img src={message} alt="" /></NavbarText>
                        </NavItem>
                        <NavItem className='icon me-3 m-2'>
                            <NavbarText>
                                <img src={add} alt="" onClick={toggle}/>
                            </NavbarText>
                        </NavItem>
                        <NavItem className='icon me-3 m-2'>
                            <NavbarText>
                                <img src={compas} alt="" />
                            </NavbarText>
                        </NavItem>
                        <NavItem className='icon me-3 m-2'>
                            <NavbarText><img src={heart} alt="" /></NavbarText>
                        </NavItem>
                        <UncontrolledDropdown className='posi'>
                            <DropdownToggle className='customer'>
                                {/* <img src={this.props.userGlobal.fotoProfile} alt="" /> */}
                                <Avatar size='sm' name='' src={fotoProfile} className='avatar'/>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <div className="square">
                                    {/* dddd */}
                                </div>
                                <DropdownItem>
                                    <Link to="/profile">Profile</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/editprofile">Pengaturan</Link>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={logoutUser2}>
                                    <Link to="/">Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
            </Navbar>
                
                    {/* utk tambah foto dibuat fixed */}
                    {/* pakai if ternary utk keluar masuk nya */}
                        <div>
                        <Button color="danger" onClick={toggle}>X</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <div className='d-flex backgroundxx flex-column'>
                                {/* section atas */}
                                <div className='box-add-home-title row '>
                                    <div className='col-7 text-center '>
                                        Buat Postingan baru
                                    </div>
                                    <button className='offset-3 col-2 text-end' onClick={btnBagikanHandler}>Bagikan</button>
                                </div>
                                {/* section bawah */}
                                <div className='d-flex row'>
                                    <div className='box-add-home d-flex flex-column align-items-center col-7'>
                                        <div className='box-add-home-postingan d-flex flex-column justify-content-center align-items-center'>
                                            {
                                                previewFoto ?
                                                <div>Masukan Foto dan Video di sini</div> 
                                                :
                                                null
                                            }
                                            <div className="col-md-3">
                                                <img id="imgpreview" width="100%"/>
                                            </div>
                                            
                                            
                                                <input 
                                                accept='image/png , image/jpg, image/jpeg'
                                                type="file" 
                                                className='mb-2' 
                                                name='postImage'
                                                onChange={onBtnAddFile}
                                                ref={inputFileRef}
                                                hidden="hidden"
                                                /> 

                                            <button className='btn btn-primary' onClick={() => inputFileRef.current.click()}>Pilih Foto</button>
                                        </div>
                                    </div>
                                    <div className='box-add-home-caption col-5'>
                                        <div className='box-add-home-caption-account d-flex mb-3'>
                                            <div className='box-add-home-caption-account-profile me-2'>
                                                {/* <img src={this.props.userGlobal.fotoProfile} alt="" /> */}
                                                <Avatar size='sm' name='' src={fotoProfile} className='avatar'/>
                                            </div>
                                            <div className='text-align-center'>{username}</div>
                                        </div>
                                        <input 
                                        type="text" 
                                        placeholder='Tulis Keterangan...' 
                                        name='caption' 
                                        onChange={(e) => inputHandler(e , "caption")} 
                                        />
                                    </div>
                                </div>
                            </div> 
                        </Modal>
                </div>
        </div>
    )
}

export default MyNavBar