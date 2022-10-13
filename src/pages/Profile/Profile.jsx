import React, { Component } from 'react';
import MyNavbar from "../../components/MyNavbar"
import PostCard from '../../components/PostCard';
import "./Profile.css"
import {Link} from "react-router-dom"
import ellipsis from "../../assets/image/iconsAllice/ellipsis.png"
import emoticon from "../../assets/image/iconsAllice/emoticon.png"
import heart from "../../assets/image/iconsAllice/heart.png"
import send from "../../assets/image/iconsAllice/send.png"
import chat from "../../assets/image/iconsAllice/chat.png"
import bookmark from "../../assets/image/iconsAllice/bookmark.png"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//redux
import {connect , useSelector, useDispatch} from "react-redux"
import Axios from 'axios';
import { API_URL } from '../../constants/API';
import { useState,  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Komentar from '../../components/Komentar';
import {Avatar} from '@chakra-ui/react'
import axios from 'axios';

function Profile () {
    const {fotoProfile, username,fullname, bio , idusers} = useSelector(state => state.userReducer)
    // console.log(idusers);
    const [postFoto, setPostFoto] = useState([])
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [postFotoDetail , setPostFotoDetail] = useState([])
    const [isEdit , setIsEdit] = useState(true)
    const [editCaption , setEditCaption] = useState("")
    const [postKomen , setPostKomen] = useState([])

    const {id} = useParams()
    // console.log(id);

    //modal
    const toggle = () => setModal(!modal)

    const toggle2 = () => setModal2(!modal2)
    // fetch data post
    const fetchPostImage = () => {
        Axios.get(`${API_URL}/post/get/${idusers}`)
        .then((result) => {
            // console.log(result.data[0].comment)
            // console.log(result.data);
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

    useEffect(() => {
        fetchComment()
        Axios.get(`${API_URL}/post/getDetail/${id}`)
        .then((result) => {
            // console.log(result.data.comment);
            // console.log(result.data.like);
            setPostFotoDetail(result.data[0])
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id])
    // console.log(postFotoDetail);

    const renderPostCard = () => {
        return postFoto.map((val) => {
            return <PostCard PostCardData={val}/>
        })
    }


    //handler btn edit
    const editBtn = () => {
        setIsEdit(!isEdit)
    }

    const deleteBtnHandler = (postId) => {
        const confirmDelete = window.confirm("nyakin mendelete post ?")
        if (confirmDelete) {
            Axios.delete(`${API_URL}/post/delete-post/${postId}`)
            .then((result) => {
                fetchPostImage()
                setModal(false)
                setModal2(false)
                alert(result.data.message)
            })
            .catch((err) => {
                alert(err)
            })
        } else {
            setModal2(false)
        }
    }

    const inputHandler = (e, field) => {
        const value = e.target.value

        if(field === "editCaption"){
            setEditCaption(value)
            // console.log(editCaption);
        }
    }

    // hadling ambil data comment
    const fetchComment = () => {
        axios.get(`${API_URL}/comment/get/${id}`)
        .then((res) => {
            setPostKomen(res.data)
            console.log(res.data);
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

    const saveNewCaption = () => {
        Axios.patch(`${API_URL}/post/edit-caption/${id}` , {
            //yg mau di edit nya
            caption: editCaption
        })
        .then(() => {
            alert("berhasil mengganti caption")
            fetchPostImage()
            setModal(false)
            setModal2(false)
        })
        .catch((err) => {
            alert(err)
        })
    }

    return (
        <div className='containerxx'>
                <MyNavbar/>
                <div className='container-profile'>
                    <div className="profile d-flex">
                        <div className="profile-image ">
                            {/* <img src={fotoProfile} alt="" /> */}
                            <Avatar size='2xl' name='' src={fotoProfile}/>
                        </div>
                        <div className="infoProfile">
                            <div className="info-profile-user my-1 d-flex">
                                <div className='info-profile-user-name'>{username}</div>
                                <Link to="/editprofile"><button>Edit Profile</button></Link>
                            </div>
                            <div className="info-profile-follow my-2 d-flex">
                                <div>0 kiriman</div>
                                <div>0 pengikut</div>
                                <div>0 diikuti</div>
                            </div>
                            <div className="info-profile-nameAsli">
                                {fullname}
                            </div>
                            <div className='mt-1'>
                                {bio}
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
                        <div className='d-flex flex-wrap ms-1' onClick={toggle}>  
                            {/* render card foto post */}
                            {renderPostCard(id)}
                        </div>
                    </div>
                </div>

                {/* utk detail post foto kita ==> detail commentar org, kita bisa comment, like , love */}
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                    <div >
                            <div className='box-detail-post d-flex flex-row align-items-center row'>
                                <div className="box-detail-post-image col-7">
                                    <img src={API_URL + postFotoDetail.postImage} alt="" />
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
                                            <div className='ellipsis'  onClick={toggle2}>
                                                <img src={ellipsis} alt="" />
                                            </div>
                                        </div>
                                    <div className="box-detail-post-Commentar pt-2">
                                        {/* render caption */}
                                        <div className='d-flex align-items-center'>
                                            <div className='info-post-gambar d-flex align-items-center'>
                                                {/* <img src={fotoProfile} alt="" /> */}
                                                <Avatar size='sm' name='' src={fotoProfile}/>
                                            </div>
                                            <div className='box-detail-post-Commentar-name'>{username}</div>
                                            <div className='box-detail-post-Commentar-komen'>{postFotoDetail.caption}</div>
                                        </div>
                                        {/* render commnetar */}
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
                                            <div>{postFotoDetail.created_date}</div>
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
                    </Modal>
                </div>

                {/* utk fitur delete dan edit */}
                {
                    isEdit ?
                <Modal isOpen={modal2} toggle={toggle2}>
                    <div className='delete-border d-flex justify-content-center align-items-center' style={{height : "50px"}} 
                    onClick={() => deleteBtnHandler(id)}>
                        Delete
                    </div>
                    <div className='edit-border d-flex justify-content-center align-items-center' style={{height : "50px"}}
                    onClick={editBtn}>
                        Edit
                    </div>
                    <ModalFooter className='edit-border d-flex justify-content-center align-items-center'>
                        <Button color="secondary"  onClick={toggle2}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                :
                <Modal isOpen={modal2} toggle={toggle2}>
                    {/* bagian kepala */}
                    <div className="kepala-edit d-flex justify-content-between">
                        <div className='kepala-edit-batal' onClick={toggle2}>
                            Batal
                        </div>
                        <div className='kepala-edit-middle'>
                            Edit Info
                        </div>
                        <div className='kepala-edit-selesai' onClick={saveNewCaption}>
                            Selesai
                        </div>
                    </div>
                    {/* bagian body */}
                    <div >
                            <div className='box-detail-post d-flex flex-row align-items-center row'>
                                <div className="box-detail-post-image col-7">
                                    <img src={API_URL + postFotoDetail.postImage} alt="" />
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
                                    </div>
                                    <div className="box-edit-caption pt-2">
                                        <div className='box-add-home-caption-account d-flex mb-3'></div>
                                        <input 
                                        type="text" 
                                        placeholder='Tulis Keterangan...' 
                                        name='caption' 
                                        onChange={(e) => inputHandler(e, "editCaption")} 
                                        />
                                        </div>
                                </div>
                            </div>
                    </div>
                </Modal>
                }
        </div>
    )
}

export default Profile
