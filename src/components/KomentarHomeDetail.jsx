import React  from 'react';
import emoticon from "../assets/image/iconsAllice/emoticon.png"
import ellipsis from "../assets/image/iconsAllice/ellipsis.png"
import bookmark from "../assets/image/iconsAllice/bookmark.png"
import heart from "../assets/image/iconsAllice/heart.png"
import chat from "../assets/image/iconsAllice/chat.png"
import send from "../assets/image/iconsAllice/send.png"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/API';
import { useState } from "react";
import { useEffect } from 'react';
import Komentar from './Komentar';
import '../assets/styles/komentarDetail.css'
import {Avatar} from '@chakra-ui/react'
import MyNavbar from './MyNavbar';

function KomentarHomeDetail () {  
    const {fotoProfile, username,} = useSelector(state => state.userReducer)
    const [postDetail, setPostDetail] = useState([])
    const [postKomen, setPostKomen] = useState([])

    const {id} = useParams()
    // console.log(id);
    // console.log(postDetail);

    const fetchDataPost = () => {
        axios.get(`${API_URL}/post/get/${id}`)
        .then((result) => {
            // console.log(postDetail.comment);
            setPostDetail(result.data[0])
            // setPostKomen(result.data.comment)
        })
        .catch((err) => {
            alert(err)
        })
    }

    const fetchComment = () => {
        axios.get(`${API_URL}/comment/get/${id}`)
        .then((res) => {
            setPostKomen(res.data)
            // console.log(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const renderComment = () => {
        return postKomen.map((val) => {
            return <Komentar postKomen={val}/>
        })
    }


    useEffect(() => {
        fetchDataPost()
        fetchComment()
    })
    return (
        <div>
            <MyNavbar/>
                <div className='containerDetail d-flex justify-content-center'>
                    <div className='box-detail-post d-flex flex-row align-items-center row'>
                        <div className="box-detail-post-image col-7">
                            <img src={API_URL+ postDetail.postImage} alt="" />
                        </div>
                        <div className="box-detail-post-comment col-5 pt-1">
                            <div className="box-detail-post-header d-flex justify-content-between align-items-center">
                                <div className='d-flex align-items-center'>
                                    <div className='info-post-gambar d-flex align-items-center'>
                                        {/* <img src={fotoProfile} alt="" /> */}
                                        <Avatar size='sm' name='' src={fotoProfile}/> 
                                    </div>
                                    <div>{username}</div>
                                    </div>
                                    <div className='ellipsis'>
                                        <img src={ellipsis} alt="" />
                                    </div>
                                </div>
                            <div className="box-detail-post-Commentar pt-2">
                                {/* render commentar */}
                                {/* <div className='d-flex align-items-center'>
                                    <div className='info-post-gambar d-flex align-items-center'>
                                        <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
                                    </div>
                                    <div className='box-detail-post-Commentar-name'>nama account</div>
                                    <div className='box-detail-post-Commentar-komen'>Commentar</div>
                                </div> */}

                                {renderComment()}
                            </div>
                            <div className="box-detail-post-footer">
                                {/* icon */}
                                <div className='icon-card d-flex justify-content-between '>
                                    <div className='d-flex ' style={{width : "120px"}}>
                                        <span className='icon-card-heart ms-1'>
                                            <img src={heart} alt="" />
                                        </span>
                                        <span className='icon-card-chat'>
                                            <img src={chat} alt="" />
                                        </span>
                                        <span className='icon-card-send'>
                                            <img src={send} alt="" />
                                        </span>
                                    </div>
                                    <span className=''>
                                        <img src={bookmark} alt="" />
                                    </span>
                                </div>
                                <div className="box-detail-post-footer-suka ms-2">
                                    <div>Di sukai oleh <span>amalia</span> dan <span>102 lainnya</span></div>
                                    <div>{postDetail.createddate}</div>
                                </div>
                                <div className="container-inputan">
                                    <span>
                                        <img src={emoticon} alt="" className='mt-3'/>
                                    </span>
                                    <input 
                                    type="text" 
                                    form='form-control' 
                                    className='inputanx rounded ms-5 my-2' 
                                    placeholder='comment here' 
                                    /> 
                                    <button>post</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default KomentarHomeDetail