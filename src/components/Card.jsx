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
import Komentar from './Komentar';

function Card (props) {
    const [isDisable, setIsDisable] = useState(true)
    const [modal, setModal] = useState(false)

    const {username, fullName, fotoProfile } = useSelector (state => state.userReducer)

    const toggle = () => setModal(!modal)
    
    const navigate = useNavigate()
    
    const handleClick = (id) => {
        navigate(`/komentarhomedetail/${id}`)
    }

    // const renderComment = () => {
    //     return props.postData.comment.map((val) => {
    //         return <Komentar KomentarData = {val}/>
    //     })
    // }
    // console.log(props.postData);

    // const renderComment = () => {
    //     return props.map((val) => {
            
    //         return ( <div className='d-flex align-items-center'>
    //                     <div className='info-post-gambar d-flex align-items-center'>
    //                         <img src={val.fotoProfil} alt="" />
    //                     </div>
    //                     <div className='box-detail-post-Commentar-name'>{val.namaPengguna}</div>
    //                     <div className='box-detail-post-Commentar-komen'>{val.isiKomentar}</div>
    //                 </div>)
    //     })
    // }

    return (
        <div className='container-card'>
                <div className="info-post d-flex justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                        <div className='info-post-gambar d-flex align-items-center'>
                            <img src={fotoProfile} alt="" />
                        </div>
                        <div>{username}</div>

                    </div>
                    <div className='ellipsis'>
                        <img src={ellipsis} alt="" />
                    </div>
                </div>
                <div className="image">
                    <img src={props.postData.PostImage} alt="" />
                </div>
                {/* pemberitahuan */}
                <div className='icon-card d-flex justify-content-between '>
                    <div>
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
                    <div><span>username yg buat</span> {props.postData.caption}</div>
                    {/* yg ini baru comment */}
                    <div><span>comment</span>  {props.postData.comment}</div>
                    <div>comment orang yg terlihat 1 atau 2</div>
                    {/* dibuat link ke page yg bisa lihat semua komentar */}
                    <div className='info-comment-komentar' onClick={toggle}>Lihat semua {props.postData.comment.length} komentar</div> 
                    <div className='info-comment-jam' onClick={() => handleClick(props.postData.id)}> <span>1 jam lalu</span> <span>Lihat Terjemahan</span> </div>
                </div>
                <hr />
                <div className="container-inputan">
                    <span>
                        <img src={emoticon} alt="" />
                    </span>
                    <input 
                    name = "commentHome"
                    type="text" 
                    form='form-control' 
                    className='inputan rounded my-2' 
                    placeholder='comment here'
                    // onChange={inputHandler}
                    />
                    {
                        isDisable?
                        <button disabled={isDisable} className="disable" >post</button>
                        :
                        <button disabled={isDisable}>post</button>
                    }
                </div>
                
            {/* utk detail post di card */}
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                    <div >
                            <div className='box-detail-post d-flex flex-row align-items-center row'>
                                <div className="box-detail-post-image col-7">
                                    <img src={props.postData.PostImage} alt="" />
                                </div>
                                <div className="box-detail-post-comment col-5 pt-1">
                                    <div className="box-detail-post-header d-flex justify-content-between align-items-center">
                                        <div className='d-flex align-items-center'>
                                            <div className='info-post-gambar d-flex align-items-center'>
                                                <img src={fotoProfile} alt="" />
                                            </div>
                                            <div>{username}</div>
                                            </div>
                                            <div className='ellipsis'>
                                                <img src={ellipsis} alt="" />
                                            </div>
                                        </div>
                                    <div className="box-detail-post-Commentar pt-2">
                                        {/* render commentar */}
                                        <div className='d-flex align-items-center'>
                                            <div className='info-post-gambar d-flex align-items-center'>
                                                <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
                                            </div>
                                            <div className='box-detail-post-Commentar-name'>nama account</div>
                                            <div className='box-detail-post-Commentar-komen'>Commentar</div>
                                        </div>

                                        {/* {renderComment()} */}
                                    </div>
                                    <div className="box-detail-post-footer">
                                        {/* icon */}
                                        <div className='icon-card d-flex justify-content-between '>
                                            <div>
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
                                            <div>{props.postData.createddate}</div>
                                        </div>
                                        <div className="container-inputan">
                                            <span>
                                                <img src={emoticon} alt="" />
                                            </span>
                                            <input 
                                            type="text" 
                                            form='form-control' 
                                            className='inputanx rounded my-2' 
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
            </div>
    )
}

export default Card