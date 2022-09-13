import React, { Component } from 'react';
import '../assets/styles/Card.css'
import emoticon from "../assets/image/iconsAllice/emoticon.png"
import ellipsis from '../assets/image/iconsAllice/ellipsis.png'
import bookmark from '../assets/image/iconsAllice/bookmark.png'
import heart from '../assets/image/iconsAllice/heart.png'
import chat from '../assets/image/iconsAllice/chat.png'
import send from '../assets/image/iconsAllice/send.png'


class Card extends Component{
    render () {
        return (
            <div className='container-card'>
                <div className="info-post d-flex justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                        <div className='info-post-gambar d-flex align-items-center'>
                            <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
                        </div>
                        <div>nama account</div>

                    </div>
                    <div className='ellipsis'>
                        <img src={ellipsis} alt="" />
                    </div>
                </div>
                <div className="image">
                    <img src="http://asset-a.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/17235_jenis-jenis-hutan-berdasarkan-bentang-alamnya.jpg" alt="" />
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
                        
                    {/* <span className=''>
                        <img src={ellipsis} alt="" />
                    </span> */}
                    <span className=''>
                        <img src={bookmark} alt="" />
                    </span>
                </div>
                {/* inputan comment */}
                <div className="info-comment">
                    <div>0 suka</div>
                    <div>comment orang yg terlihat 1 atau 2</div>
                    <div>comment orang yg terlihat 1 atau 2</div>
                    <div>comment orang yg terlihat 1 atau 2</div>
                    {/* dibuat link ke page yg bisa lihat semua komentar */}
                    <div className='info-comment-komentar'>Lihat semua 0000 komentar</div> 
                    <div className='info-comment-jam'> <span>1 jam lalu</span> <span>Lihat Terjemahan</span> </div>
                </div>
                <hr />
                <div className="container-inputan">
                    <span>
                        <img src={emoticon} alt="" />
                    </span>
                    <input type="text" form='form-control' className='inputan rounded my-2' placeholder='comment here' /> 
                    <button>post</button>
                </div>
            </div>
        )
    }
}

export default Card