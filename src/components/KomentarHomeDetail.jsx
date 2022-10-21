import React  from 'react';
import emoticon from "../assets/image/iconsAllice/emoticon.png"
import ellipsis from "../assets/image/iconsAllice/ellipsis.png"
import bookmark from "../assets/image/iconsAllice/bookmark.png"
import heart from "../assets/image/iconsAllice/heart.png"
import chat from "../assets/image/iconsAllice/chat.png"
import send from "../assets/image/iconsAllice/send.png"
import heartMerah from "../assets/image/iconsAllice/heartMerah.png"
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
    const userGlobal = useSelector(state => state.userReducer)
    const [postDetail, setPostDetail] = useState([])
    const [postKomen, setPostKomen] = useState([])
    const [isiKomen , setIsiKomen] = useState("")
    const [isDisable, setIsDisable] = useState(true)
    const [changeHeart , setChangeHearth] = useState(true)

    const {id} = useParams()
    // console.log(id);
    // console.log(postDetail);

    const fetchDataPost = () => {
        axios.get(`${API_URL}/post/getDetail/${id}`)
        .then((result) => {
            // console.log(result.data[0].Likes);
            setPostDetail(result.data)
            // console.log(result.data.Likes.length);
            
            // pengkondisian utk cek ada yg like atau tidak
            if (result.data.Likes.length !== 0){
                setChangeHearth(true)
            } else {
                setChangeHearth(false)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    // console.log(likes.length);
    
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
    },[])

        //handling utk isi komen
    const inputHandler = (e, field) => {
        const {value} = e.target
        // console.log(value);

        if(field === "komentar"){
            setIsiKomen(value)
            setIsDisable(false)
        }
    }

    const btnPostKomen = () => {
        if(isiKomen){
            axios.post(`${API_URL}/comment/uploadcomment`, {
                isi_commentar : isiKomen,
                UsersId : userGlobal.id,
                PostId : id,
            })
            .then((res) => {
                alert(res.data.message)
                setIsiKomen("")
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        fetchComment()
    }, [isiKomen])

    // handle button like
    const btnLike = () => {
        axios.post(`${API_URL}/like/add-like`, {
            UsersId : userGlobal.id,
            PostId : id
        })
        .then((res) => {
            alert(res.data.message)
            // utk ubah-ubah heart nya
            if(res.data.message === "Unlike Post"){
                setChangeHearth(true)
            } else {
                setChangeHearth(false)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <MyNavbar/>
                <div className='containerDetail d-flex justify-content-center'>
                    <div className='box-detail-post d-flex flex-row align-items-center row'>
                        <div className="box-detail-post-image col-7">
                            <img src={postDetail.postImage} alt="" />
                        </div>
                        <div className="box-detail-post-comment col-5 pt-1">
                            <div className="box-detail-post-header d-flex justify-content-between align-items-center">
                                <div className='d-flex align-items-center'>
                                    <div className='info-post-gambar d-flex align-items-center'>
                                        {/* <img src={fotoProfile} alt="" /> */}
                                        <Avatar size='sm' name='' src={userGlobal.fotoProfile}/> 
                                    </div>
                                    <div>{userGlobal.username}</div>
                                    </div>
                                    <div className='ellipsis'>
                                        <img src={ellipsis} alt="" />
                                    </div>
                                </div>
                            {/* render caption */}
                            <div className='d-flex align-items-center'>
                                <div className='info-post-gambar d-flex align-items-center'>
                                    {/* <img src={fotoProfile} alt="" /> */}
                                    <Avatar size='sm' name='' src={userGlobal.fotoProfile}/>
                                </div>
                                <div className='box-detail-post-Commentar-name'>{userGlobal.username}</div>
                                <div className='box-detail-post-Commentar-komen'>{postDetail.caption}</div>
                            </div>
                            <div className="box-detail-post-Commentar pt-2">
                                {/* render commentar */}
                                {renderComment()}
                            </div>
                            <div className="box-detail-post-footer">
                                {/* icon */}
                                <div className='icon-card d-flex justify-content-between '>
                                    <div className='d-flex ' style={{width : "120px"}}>
                                        <span className='icon-card-heart ms-1'>
                                            {/* ternary option jika hearth dan like bertambah */}
                                            {
                                                changeHeart ?
                                                <img src={heartMerah} alt="" onClick={btnLike}/>
                                                :
                                                <img src={heart} alt="" onClick={btnLike}/>
                                            }
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
                                    <div>{postDetail.created_date}</div>
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
                                    onChange={(e) => inputHandler(e , "komentar")} 
                                    value={isiKomen}
                                    /> 
                                    {
                                        isDisable?
                                        <button disabled={isDisable} className="disable">post</button>
                                        :
                                        <button disabled={isDisable} onClick={btnPostKomen}>post</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default KomentarHomeDetail