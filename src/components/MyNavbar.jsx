import React, { Component, Fragment } from 'react';
import {Navbar, Nav ,NavItem , UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import compas from "../assets/image/iconsAllice/compas.png"
import customer from "../assets/image/iconsAllice/customer.png"
import heart from "../assets/image/iconsAllice/heart.png"
import add from "../assets/image/iconsAllice/add.png"
import message from "../assets/image/iconsAllice/message.png"
import home from "../assets/image/iconsAllice/home.png"
import "../assets/styles/MyNav.css"
//redux
import {logoutUser, btnHandlerAdd , btnHandlerClose} from '../redux/actions/userAct'

class MyNavBar extends Component {
    state = {
        clicked : true
    }

    handleClick () {
        alert("test")
        // this.setState({clicked : false})
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
                                <img src={add} alt="" onClick={this.props.btnHandlerAdd}/>
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
                                <img src={customer} alt="" />
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
                    {
                        this.props.userGlobal.isAdd ?
                            <div >
                                <div className="container-box-add d-flex justify-content-center" onClick={this.props.btnHandlerClose}>
                                    {/* sengaja kosong utk background transparant saja */}
                                </div>
                                    <div className='box-add-home d-flex flex-column align-items-center'>
                                        <div className='box-add-home-title'>Buat Postingan baru</div>
                                        <div className='box-add-home-postingan d-flex flex-column justify-content-center align-items-center'>
                                            <div>Seret Foto dan Video di sini</div>
                                            <button className='btn btn-primary'>Pilih Foto</button>
                                        </div>
                                    </div>
                            </div>
                            :
                            null
                    }
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
    btnHandlerAdd,
    btnHandlerClose
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNavBar)


