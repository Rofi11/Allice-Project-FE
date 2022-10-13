import React, { Fragment } from 'react';
import {Avatar} from '@chakra-ui/react'

function Komentar (props) {
    // console.log(props);
    return (
        <div className='d-flex align-items-center'>
            <div className='info-post-gambar d-flex align-items-center'>
                {/* <img src={props.postKomen.fotoProfile} alt="" /> */}
                <Avatar size='sm' name='' src={props.postKomen.fotoProfile}/>
            </div>
            <div className='box-detail-post-Commentar-name'>{props.postKomen.username}</div>
            <div className='box-detail-post-Commentar-komen'>{props.postKomen.isi_commentar}</div>
        </div>
    )
}

export default Komentar