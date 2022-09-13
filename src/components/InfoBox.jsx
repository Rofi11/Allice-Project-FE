import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/InfoBox.css"

function infoBox () {
    return(
        <div className='info-box mb-2 d-flex justify-content-between align-items-center'>
            <div className='d-flex'>
                <div className="image">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
                </div>
                <div className='info-box-name'>
                    <div className='info-box-namaFollow'>wariss imut</div>
                    <div className='info-box-diikuti text-muted'>diikuti oleh FadliMulder + 4 lainya</div>
                </div>
            </div>

            <div className='info-box-ikuti'>Ikuti</div>
        </div>
    )
}

export default infoBox