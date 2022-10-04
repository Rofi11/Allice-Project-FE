import React, { Component, Fragment } from 'react';
import {Navbar, Nav ,NavItem , UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Link, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import compas from "../assets/image/iconsAllice/compas.png"
import customer from "../assets/image/iconsAllice/customer.png"
import heart from "../assets/image/iconsAllice/heart.png"
import add from "../assets/image/iconsAllice/add.png"
import message from "../assets/image/iconsAllice/message.png"
import home from "../assets/image/iconsAllice/home.png"
import "../assets/styles/MyNav.css"
import axios from 'axios';
import { API_URL } from '../constants/API';
//redux
import {logoutUser, userKeepLogin} from '../redux/actions/userAct'

class MyNavBar extends Component {
    state = {
            modal: false,
            postImage: "",
            caption : "",
            isPilihFoto : false,
        };

    toggle = this.toggle.bind(this);
    

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    // mengatasi inputan
    inputHandler = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name] : value})
    }

    //handler pilih foto
    btnPilihFoto = () => {
        this.setState({
            isPilihFoto : true
        })
    }

    btnBagikanHandler = () => {
        const d = new Date()

        axios.post(`${API_URL}/post` , {
            userId : this.props.userGlobal.id,
            PostImage : this.state.postImage,
            caption : this.state.caption,
            createddate : `${d.getMonth()}, ${d.getDate()} - ${d.getFullYear()}`,
            like : 0,
            comment : []
        })
        .then((result) => {
            alert("Berhasil menambahkan foto baru")
            this.setState({
                modal : false
            })
            this.props.userKeepLogin(this.props.userGlobal.id)
        })
        .catch((err) => {
            alert(err)
        })
    }

    componentDidUpdate () {
        this.props.userKeepLogin(this.props.userGlobal.id)
    }

    render() {
        return (
            <div className='background-behind'>
            <Navbar className='containerx'>
                    <NavbarBrand>
                        <em className='logo'>Allice</em>
                    </NavbarBrand>
                    <Nav> 
                        <NavItem className='search'>
                            <NavbarText><input type="text" className='form-control' placeholder='Search'/></NavbarText>
                        </NavItem>
                        <NavItem className='me-3 m-2'>
                            <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
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
                                <img src={add} alt="" onClick={this.toggle}/>
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
                                <img src={this.props.userGlobal.fotoProfile} alt="" />
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
                                <DropdownItem onClick={this.props.logoutUser}>
                                    <Link to="/">Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
            </Navbar>
                
                    {/* utk tambah foto dibuat fixed */}
                    {/* pakai if ternary utk keluar masuk nya */}
                        <div>
                        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <div className='d-flex backgroundxx flex-column'>
                                {/* section atas */}
                                <div className='box-add-home-title row '>
                                    <div className='col-7 text-center '>
                                        Buat Postingan baru
                                    </div>
                                    <button className='offset-3 col-2 text-end' onClick={this.btnBagikanHandler}>Bagikan</button>
                                </div>
                                {/* section bawah */}
                                <div className='d-flex row'>
                                    <div className='box-add-home d-flex flex-column align-items-center col-7'>
                                        <div className='box-add-home-postingan d-flex flex-column justify-content-center align-items-center'>
                                            <div>Masukan Foto dan Video di sini</div>

                                            {
                                                this.state.isPilihFoto ?
                                                <input 
                                                type="text" 
                                                className='mb-2' 
                                                name='postImage'
                                                onChange={this.inputHandler}
                                                /> 
                                                :
                                                null
                                            }
                                            <button className='btn btn-primary' onClick={this.btnPilihFoto}>Pilih Foto</button>
                                        </div>
                                    </div>
                                    <div className='box-add-home-caption col-5'>
                                        <div className='box-add-home-caption-account d-flex mb-3'>
                                            <div className='box-add-home-caption-account-profile me-2'>
                                                <img src={this.props.userGlobal.fotoProfile} alt="" />
                                            </div>
                                            <div className='text-align-center'>{this.props.userGlobal.username}</div>
                                        </div>
                                        <input 
                                        type="text" 
                                        placeholder='Tulis Keterangan...' 
                                        name='caption' 
                                        onChange={this.inputHandler} 
                                        />
                                    </div>
                                </div>
                            </div> 
                        </Modal>
                        </div>
                        </div>
        )
    };
}


const mapStateToProps = (state) => {
    return{
        userGlobal : state.userReducer
    }
}

const mapDispatchToProps = {
    logoutUser,
    userKeepLogin
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNavBar)




                            //  <ModalHeader>
                            //     <div className='box-add-home-title'>
                            //             Buat Postingan baru
                            //             <button className='justify-content-end'>Bagikan</button>
                            //     </div>
                            // </ModalHeader>
                            // <ModalBody>
                            //     <div className='box-add-home-postingan d-flex flex-column justify-content-center align-items-center'>
                            //             <div>Seret Foto dan Video di sini</div>
                            //             <button className='btn btn-primary'>Pilih Foto</button>
                            //     </div>
                            // </ModalBody>