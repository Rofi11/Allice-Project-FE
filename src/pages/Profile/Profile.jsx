import React, { Component } from 'react';
import MyNavbar from "../../components/MyNavbar"
import PostCard from '../../components/PostCard';
import "./Profile.css"
import {Link} from "react-router-dom"

class Profile extends Component {
    render() {
        return (
            <div className='bg bg-light'>
                <MyNavbar/>
                <div className='container-profile'>
                    <div className="profile d-flex">
                        <div className="profile-image ">
                            <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
                        </div>
                        <div className="infoProfile">
                            <div className="info-profile-user my-1 d-flex">
                                <div className='info-profile-user-name'>Rofi_mmhd</div>
                                <Link to="/editprofile"><button>Edit Profile</button></Link>
                            </div>
                            <div className="info-profile-follow my-2 d-flex">
                                <div>0 kiriman</div>
                                <div>0 pengikut</div>
                                <div>0 diikuti</div>
                            </div>
                            <div className="info-profile-nameAsli">
                                muhammadRofi(Nama Asli)
                            </div>
                        </div>
                    </div>
                <hr />
                    <div className="option-profile d-flex justify-content-center mb-3">
                        <span>POSTINGAN</span>
                        <span>TERSIMPAN</span>
                        <span>DITANDAI</span>
                    </div>
                    <div className="post-foto">
                        <div className='d-flex flex-wrap ms-1'>
                            {/* render card foto post */}
                            <PostCard/>
                            <PostCard/>
                            <PostCard/>
                            <PostCard/>
                            <PostCard/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile