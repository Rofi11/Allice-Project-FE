import { useState } from 'react';
import "../assets/styles/PostCard.css"
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/API';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ellipsis from "../assets/image/iconsAllice/ellipsis.png"
import emoticon from "../assets/image/iconsAllice/emoticon.png"
import heart from "../assets/image/iconsAllice/heart.png"
import send from "../assets/image/iconsAllice/send.png"
import chat from "../assets/image/iconsAllice/chat.png"
import bookmark from "../assets/image/iconsAllice/bookmark.png"
import heartMerah from "../assets/image/iconsAllice/heartMerah.png"
import {Avatar} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import Komentar from './Komentar';
import { useEffect } from 'react';


const PostCard = (props) => {
    // console.log(props.checklike);
    const [postFotoDetail , setPostFotoDetail] = useState([])
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [isDisable, setIsDisable] = useState(true)
    const [likes, setLikes] = useState(props.checklike)
    const [editCaption , setEditCaption] = useState("")
    const [commentarProfile, setCommentarProfile] = useState("")
    const [isEdit , setIsEdit] = useState(true)
    const [dataKomen , setDataKomen] = useState([])

    const {fotoProfile, username, id} = useSelector((state) => state.userReducer)

    const toggle = () => setModal(!modal)

    const toggle2 = () => setModal2(!modal2)

    const editBtn = () => {
        setIsEdit(!isEdit)
    }

    // const getPostDetail = () => {
    //     axios.get(`${API_URL}/post/getDetail/${props.idPost}`)
    //     .then((result) => {
    //         setPostFotoDetail(result.data)
    //         // console.log(result.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    // fetch comment agar ada avatar profile
    const fetchComment = () => {
        axios.get(`${API_URL}/comment/get/${props.idPost}`)
        .then((res) => {
            setDataKomen(res.data)
            // console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }


    useEffect(() => {
        // getPostDetail()
        fetchComment()
    }, [])

    // useEffect(() => {
    //     getPostDetail()
    // }, [props.idPost])

    const renderComment = () => {
        return dataKomen.map((val) => {
            return <Komentar postKomen={val}/>
        })
    }

    const btnLike = () => {
        axios.post(`${API_URL}/like/add-like`, {
            UsersId : id,
            PostId : props.idPost
        })
        .then((res) => {
            alert(res.data.message)
            console.log(res.data.message);
            // utk ubah-ubah heart nya
            if(res.data.message === "Unlike Post"){
                setLikes(false)
            } else {
                setLikes(true)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const inputHandler = (e, field) => {
        const value = e.target.value

        if(field === "editCaption"){
            setEditCaption(value)
        } else if(field === "commentarProfile"){
            setCommentarProfile(value)
            setIsDisable(false)
        }
    }

    const saveNewCaption = () => {
        axios.patch(`${API_URL}/post/edit-caption/${props.idPost}` , {
            //yg mau di edit nya
            caption: editCaption
        })
        .then(() => {
            alert("berhasil mengganti caption")
            // fetchPostImage()
            setModal(false)
            setModal2(false)
        })
        .catch((err) => {
            alert(err)
        })
    }

    const btnPostKomen = () => {
        if(commentarProfile){
            axios.post(`${API_URL}/comment/uploadcomment`, {
                isi_commentar : commentarProfile,
                UsersId : id,
                PostId : props.idPost,
            })
            .then((res) => {
                alert(res.data.message)
                setCommentarProfile("")
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const deleteBtnHandler = (postId) => {
        
        let foto = props.postImage.split("/")[4] // split dulu utk dpt data yg dibutuhkan, jangan ngirim segolongong, kita hanya butuh index ke 4 nya saja

        const confirmDelete = window.confirm("nyakin mendelete post ?")
        if (confirmDelete) {
            axios.post(`${API_URL}/post/delete-post`, {
                id : postId,
                old_img : foto
            })
            .then((result) => {
                // fetchPostImage()
                setModal(false)
                setModal2(false)
                alert("Post telah terhapus")
            })
            .catch((err) => {
                alert(err)
            })
        } else {
            setModal2(false)
        }
    }




    return(
        <div className='post-card'>
            {/* klik disini nanti utk buka modal */}
            <img src={props.postImage} alt="" onClick={toggle}/>
            
                {/* utk detail post foto kita ==> detail commentar org, kita bisa comment, like , love */}
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <div>
                            <div className='box-detail-post d-flex flex-row align-items-center row'>
                                <div className="box-detail-post-image col-7">
                                    <img src={props.postImage} alt="" />
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
                                            <div className='box-detail-post-Commentar-komen'>{props.caption}</div>
                                        </div>
                                        {/* render commnetar */}
                                        {renderComment()}
                                    </div>
                                    <div className="box-detail-post-footer">
                                        {/* icon */}
                                        <div className='icon-card d-flex justify-content-between '>
                                            <div className='d-flex ' style={{width : "120px"}}>
                                                <span className='icon-card-heart ms-1'>
                                                    {/* ternary option jika hearth dan like bertambah */}
                                                    {
                                                        likes ?
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
                                            <div>{props.created_date}</div>
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
                                            onChange={(e) => inputHandler(e, "commentarProfile")}
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
                        {
                                isEdit ?
                            <Modal isOpen={modal2} toggle={toggle2}>
                                <div className='delete-border d-flex justify-content-center align-items-center' style={{height : "50px"}} 
                                onClick={() => deleteBtnHandler(props.idPost)}>
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
                                                <img src={props.postImage} alt="" />
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
                    </Modal>
                </div>
            </div>
        )
}

export default PostCard