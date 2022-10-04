import React, { useState,useEffect} from 'react';
import MyNavBar from '../../components/MyNavbar';
import './Home.css'
import "bootstrap/dist/css/bootstrap.css"
import Card from '../../components/Card';
import BoxStory from '../../components/BoxStory';
import InfoBox from '../../components/InfoBox';
import { connect ,useSelector, useDispatch} from 'react-redux';
import Axios from "axios"
import { API_URL } from '../../constants/API';
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import emoticon from "../../assets/image/iconsAllice/emoticon.png"
import ellipsis from "../../assets/image/iconsAllice/ellipsis.png"
import bookmark from "../../assets/image/iconsAllice/bookmark.png"
import heart from "../../assets/image/iconsAllice/heart.png"
import chat from "../../assets/image/iconsAllice/chat.png"
import send from "../../assets/image/iconsAllice/send.png"


function Home () {
    const {username, fullName, fotoProfile } = useSelector(state => state.userReducer)

    const [postHome, setPostHome] = useState([])
    // const [modal, setModal] = useState(false)
    // const [postFotoDetailHome, setPostFotoDetailHome] = useState([])

    // const toggle = () => setModal(!modal)

    // ambil id kiriman card
    // const {id} = useParams()

    // fetch data
    const fetchPostHome = () => {
        Axios.get(`${API_URL}/post`)
        .then((res) => {
            // console.log(res.data);
            setPostHome(res.data)
        })
        .catch((err) => {
            alert(err)
        })
    }

    useEffect(() => {
        fetchPostHome()
    })

    useEffect(() => {
        fetchPostHome()
    }, [postHome])

    const renderPost = () => {
        return postHome.map((val) => {
            return <Card postData= {val}/>
        })
    }


    return(
        <div className='background bg bg-light'>
            <MyNavBar/>
            {/* bagian story */}
            <div className="containerUtama row">
                <div className='col-7 d-flex flex-column'>
                    <div className="container-story col-12 d-flex justify-content-start align-items-center">
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                        <div className="box-story">
                            <BoxStory/>
                        </div>
                    </div>
                    <div className="box-card d-flex justify-content-around mt-3 flex-wrap ">
                        {/* tinggal buat function utk loop kalo udh ada database */}
                        {/* <Card/> 
                        <Card/>  */}
                        {renderPost()}
                    </div>                       
                </div>
                {/* bagian 2 yang info box */}
                <div className="box-info col-4 mt-5">
                    {/* bagian info profile */}
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="info-profile">
                            <div className='d-flex align-items-center'>
                                <div className='image'>
                                    <img src={fotoProfile} alt="" />
                                </div>
                                <div className='info-profile-name'>
                                    <div>{username}</div>
                                    <div className='text-muted'>{fullName}</div>
                                </div>
                            </div>
                        </div>
                        <div className='info-profile-alihkan '>
                            Alihkan
                        </div>

                    </div>
                    {/* bagian orang di sekitar */}
                    <div className='info-sekitar'>
                        <div className='d-flex my-2 justify-content-between align-items-center'>
                            <div className='info-sekitar-saran'>Saran Untuk Anda</div>
                            <div className='info-sekitar-lihat'>Lihat Semua</div>
                        </div>
                        <div className="info-sekitar-follow d-flex flex-column justify-content-between">
                            <InfoBox/>
                            <InfoBox/>
                            <InfoBox/>
                            <InfoBox/>
                            <InfoBox/>
                        </div>
                        <div className="info-sekitar-footer">
                            <div className='d-flex flex-wrap mb-4'>
                                <span>Tentang</span>
                                <span>Bantuan</span>
                                <span>Pers</span>
                                <span>API</span>
                                <span>Pekerjaan</span>
                                <span>Privasi</span>
                                <span>ketentuan</span>
                                <span>Lokasi</span>
                                <span>Bahasa</span>
                            </div>
                            <div className='footer'>
                                2022 ALLICE FROM META
                            </div>
                        </div>
                    </div>
                </div>                   
            </div>

        </div>
    )
}

export default Home