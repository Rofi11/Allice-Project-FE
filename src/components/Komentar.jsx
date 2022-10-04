import React, { Fragment } from 'react';

function Komentar (props) {
    // console.log(props);
    return (
        <div className='d-flex align-items-center'>
            <div className='info-post-gambar d-flex align-items-center'>
                <img src={props.komentarData.fotoProfil} alt="" />
            </div>
            <div className='box-detail-post-Commentar-name'>{props.komentarData.namaPengguna}</div>
            <div className='box-detail-post-Commentar-komen'>{props.komentarData.isiKomentar}</div>
        </div>
    )
}

export default Komentar