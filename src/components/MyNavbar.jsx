import React, { Component, Fragment } from 'react';
import {Navbar, Nav ,NavItem , UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//redux
import {logoutUser} from '../redux/actions/userAct'

class MyNavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color='light' light>
                    <NavbarBrand>Allice</NavbarBrand>
                    <Nav>
                    {/* ternary option udh login atau belum */}
                    {
                        this.props.userGlobal.username ?
                        <Fragment>
                            <NavItem className='me-5 m-2'>
                                <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
                            </NavItem>
                            <NavItem className='me-5 m-2'>
                                <NavbarText>Notification</NavbarText>
                            </NavItem>
                            <NavItem className='me-5 m-2'>
                                <NavbarText>Pesan</NavbarText>
                            </NavItem>
                            <UncontrolledDropdown>
                                <DropdownToggle nav caret>
                                    Menu
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to="/Akun">Akun</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/Pengaturan">Pengaturan</Link>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem onClick={this.props.logoutUser}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Fragment>
                        :
                        <NavItem>
                            <NavbarText>
                                <Link to="/login">Sign in</Link>  |  <Link to="/signUp">Sign Up</Link>
                            </NavbarText>
                        </NavItem>   
                        
                    }
                    
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userGlobal : state.userReducer
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNavBar)