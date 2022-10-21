import React, { Component } from 'react';
import MyNavbar from "../../components/MyNavbar"
import PostCard from '../../components/PostCard';
import "./Profile.css"
import {Link} from "react-router-dom"
//redux
import {useSelector,} from "react-redux"
import Axios from 'axios';
import { API_URL } from '../../constants/API';
import { useState,  useEffect } from 'react';
import {Avatar} from '@chakra-ui/react'


function Profile () {
    const userGlobal = useSelector(state => state.userReducer)
    // console.log(idusers);
    const [postFoto, setPostFoto] = useState([])

    // fetch data post
    const fetchPostImage = () => {
        Axios.get(`${API_URL}/post/get/${userGlobal.id}`)
        .then((result) => {
            setPostFoto(result.data)
        })
        .catch((err) => {
            alert(err)
        })
    }

    //component did mount
    useEffect(() => {
        fetchPostImage()
    }, [])

    // did update
    useEffect(() => {
        fetchPostImage()
    }, [postFoto])

    const renderPostCard = () => {
        return postFoto.map((val) => {
            let like = false
    
            const arr = val?.Likes?.find((a) => {
                return a.UsersId === userGlobal.id
            })
    
            if (arr) {
                like = true
            }
            return <PostCard 
                idPost = {val.id}
                postImage = {val.postImage}
                caption = {val.caption}
                created_date = {val.created_date}
                usersId = {val.usersId}
                commentars = {val.Commentars}
                likes = {val.Likes}
                checklike = {like}
                />
        })
    }


    return (
        <div className='containerxx'>
                <MyNavbar/>
                <div className='container-profile'>
                    <div className="profile d-flex">
                        <div className="profile-image ">
                            {/* <img src={fotoProfile} alt="" /> */}
                            <Avatar size='2xl' name='' src={userGlobal.fotoProfile}/>
                        </div>
                        <div className="infoProfile">
                            <div className="info-profile-user my-1 d-flex">
                                <div className='info-profile-user-name'>{userGlobal.username}</div>
                                <Link to="/editprofile"><button>Edit Profile</button></Link>
                            </div>
                            <div className="info-profile-follow my-2 d-flex">
                                <div>0 kiriman</div>
                                <div>0 pengikut</div>
                                <div>0 diikuti</div>
                            </div>
                            <div className="info-profile-nameAsli">
                                {userGlobal.fullname}
                            </div>
                            <div className='mt-1'>
                                {userGlobal.bio}
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
                        {/* ketika di click harus kirimid gambar, dan di tangkap di post card dan tampilkan */}
                        <div className='d-flex flex-wrap ms-1'>  
                            {/* render card foto post */}
                            {renderPostCard()}
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Profile
