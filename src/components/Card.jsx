import React, { Component,} from 'react';
import '../assets/styles/Card.css'
import { useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emoticon from "../assets/image/iconsAllice/emoticon.png"
import ellipsis from "../assets/image/iconsAllice/ellipsis.png"
import bookmark from "../assets/image/iconsAllice/bookmark.png"
import heart from "../assets/image/iconsAllice/heart.png"
import chat from "../assets/image/iconsAllice/chat.png"
import send from "../assets/image/iconsAllice/send.png"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API_URL } from '../constants/API';
import Komentar from './Komentar';
import {Avatar} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect } from 'react';

function Card (props) {
    // console.log(props);
    const [isDisable, setIsDisable] = useState(true)
    const [modal, setModal] = useState(false)
    const [dataKomen , setDataKomen] = useState([])
    const [postKomen , setPostKomen] = useState("")

    const {username, fullname, fotoProfile, idusers } = useSelector (state => state.userReducer)
    // console.log(idusers);

    const toggle = () => setModal(!modal)
    
    const navigate = useNavigate()
    
    const handleClick = (id) => {
        navigate(`/komentarhomedetail/${id}`)
    }

    // console.log(props.postData.idpost);

    // hadling ambil data comment
    const fetchComment = () => {
        axios.get(`${API_URL}/comment/get/${props.postData.idpost}`)
        .then((res) => {
            setDataKomen(res.data)
            // console.log(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchComment()
        // homeComment()
    }, [])

    const renderComment = () => {
        return dataKomen.map((val) => {
            return <Komentar postKomen={val}/>
        })
    }

    // const homeComment = () => {
    //     return dataKomen.map((val) => {
    //         console.log(val);
    //         return <div className='d-flex'>
    //             <div>
    //                 {val.username}
    //             </div>
    //             <div>
    //                 {val.isi_commentar}
    //             </div>
    //         </div>
    //     })
    // }

    //handling utk post komen
    const inputHandler = (e, field) => {
        const {value} = e.target
        console.log(value);

        if(field === "komentar"){
            setPostKomen(value)
            setIsDisable(false)
        }
    }

    const btnPostKomen = () => {
        if(postKomen){
            axios.post(`${API_URL}/comment/uploadcomment`, {
                isi_commentar : postKomen,
                idusers : idusers,
                idpost : props.postData.idpost
            })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div className='container-card'>
                <div className="info-post d-flex justify-content-between align-items-center">
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
                <div className="image">
                    <img src={API_URL+ props.postData.postImage} alt="" />
                </div>
                {/* pemberitahuan */}
                <div className='icon-card d-flex flex-row justify-content-between'>
                    <div className='icon-card-container d-flex ' style={{width : "120px"}}>
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
                {/* inputan comment */}
                <div className="info-comment">
                    <div>0 suka</div>
                    {/* ini caption */}
                    <div><span>{username}</span> {props.postData.caption}</div>
                    {/* yg ini baru comment */}
                    <div><span>comment</span>  comment</div>
                    <div className='d-flex flex-column'>
                        comment orang yg terlihat 1 atau 2
                        {/* {homeComment()} */}
                    </div>
                    {/* dibuat link ke page yg bisa lihat semua komentar */}
                    <div className='info-comment-komentar' onClick={toggle}>Lihat semua 0 komentar</div> 
                    <div className='info-comment-jam' onClick={() => handleClick(props.postData.idpost)}> <span>1 jam lalu</span> <span>Lihat Terjemahan</span> </div>
                </div>
                {/* <hr /> */}
                <div className="container-inputan my-3">
                    <span>
                        <img src={emoticon} alt="" className=' mt-2'/>
                    </span>
                    <input 
                    name = "commentHome"
                    type="text" 
                    form='form-control' 
                    className='inputan rounded' 
                    placeholder='comment here'
                    onChange={(e) => inputHandler(e , "komentar")}
                    />
                    {
                        isDisable?
                        <button disabled={isDisable} className="disable" >post</button>
                        :
                        <button disabled={isDisable} onClick={btnPostKomen}>post</button>
                    }
                </div>
                
            {/* utk detail post di card */}
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                    <div >
                            <div className='box-detail-post d-flex flex-row align-items-center row'>
                                <div className="box-detail-post-image col-7">
                                    <img src={API_URL+ props.postData.postImage} alt="" />
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
                                            <div>{props.postData.created_date}</div>
                                        </div>
                                        <div className="container-inputan">
                                            <span>
                                                <img src={emoticon} alt=""  className=' mt-3'/>
                                            </span>
                                            <input 
                                            type="text" 
                                            form='form-control' 
                                            className='inputanx rounded ms-5 my-2 ' 
                                            placeholder='comment here'
                                            onChange={(e) => inputHandler(e , "komentar")} 
                                            /> 
                                            {
                                                isDisable?
                                                <button disabled={isDisable} className="disable" >post</button>
                                                :
                                                <button disabled={isDisable} onClick={btnPostKomen}>post</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </Modal>
                </div>
            </div>
    )
}

export default Card