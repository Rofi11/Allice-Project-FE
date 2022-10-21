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
import {Avatar ,Spinner} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller';


function Home () {
    const {username, fullname, fotoProfile,id } = useSelector(state => state.userReducer)

    const [postHome, setPostHome] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [page,setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);

    // fetch data
    const fetchPostHome = () => {
        Axios.get(`${API_URL}/post/getAll?page=${page}&limit=2`)
        .then((res) => {
            const data = res.data.results
            console.log(data);
            setPostHome([...postHome, ...data]) // menyatukan data yg di get oleh front ke back-end
            setPage(page + 1)

            // console.log(res.data.results.length);
            if(res.data.results.length == 0){
                setHasMoreItems(false)
            } else {
                setHasMoreItems(true)
            }
        })
        .catch((err) => {
            alert(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }


    const renderPost = () => {
        return postHome.map((val) => {
            // nilai awal utk like
            let like = false
            //penampung data
            const arr = val?.Likes?.find((a) => {
                return a.UsersId === id
            })
            // console.log(arr);
        // pengkondisian jika data like ada
        if (arr) { 
            like = true
        }

            return <Card 
                id = {val.id}
                postImage = {val.postImage}
                caption = {val.caption}
                commentars = {val.Commentars}
                created_date = {val.created_date}
                likes = {val.number_of_likes}
                checklike = {like}
                username={val.User?.username}
                avatar={val.User?.fotoProfile}
                />
        })
    }


    return(
        <div className='bg bg-light'>
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
                    {
                        isLoading ? <Spinner/> 
                        :
                    <div className="box-card d-flex justify-content-around mt-3 flex-wrap ">
                        <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchPostHome}
                        hasMore={hasMoreItems}
                        >
                            {renderPost()}

                        </InfiniteScroll>
                    </div>                       
                    }
                </div>
                {/* bagian 2 yang info box */}
                <div className="box-info col-4 mt-5">
                    {/* bagian info profile */}
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="info-profile">
                            <div className='d-flex align-items-center'>
                                <div className='image'>
                                    {/* <img src={fotoProfile} alt="" /> */}
                                    <Avatar name='' src={fotoProfile}/>
                                </div>
                                <div className='info-profile-name'>
                                    <div>{username}</div>
                                    <div className='text-muted'>{fullname}</div>
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