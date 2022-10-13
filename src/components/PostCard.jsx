import React from 'react';
import "../assets/styles/PostCard.css"
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/API';

const PostCard = (props) => {
    const navigate = useNavigate()
    //buat btn utk 
    const handleClick = (id) => {
        navigate(`/profile/${id}`)
    }

    return(
        <div className='post-card'>
            <img src={ API_URL+ props.PostCardData.postImage} onClick={() => {handleClick(props.PostCardData.idpost)}} alt="" />
        </div>
    )
}

export default PostCard