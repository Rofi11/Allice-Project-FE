import React, { Component, Fragment } from 'react';
import MyNavBar from '../../components/MyNavbar';
import './Home.css'
import "bootstrap/dist/css/bootstrap.css"
import Card from '../../components/Card';
import BoxStory from '../../components/BoxStory';
import InfoBox from '../../components/InfoBox';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        return (
            <Fragment>
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
                            <div className="box-card d-flex justify-content-around mt-3 flex-wrap">
                                {/* tinggal buat function utk loop kalo udh ada database */}
                                <Card/>
                                <Card/>
                            </div>                       
                        </div>
                        {/* bagian 2 yang info box */}
                        <div className="box-info col-4 mt-5">
                            {/* bagian info profile */}
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className="info-profile">
                                    <div className='d-flex align-items-center'>
                                        <div className='image'>
                                            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
                                        </div>
                                        <div className='info-profile-name'>
                                            <div>Rofi_mmhd</div>
                                            <div className='text-muted'>muhammadRofi(username)</div>
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userGlobal : state.userReducer
    }
}

export default connect(mapStateToProps)(Home)