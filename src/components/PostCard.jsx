import React from 'react';
import "../assets/styles/PostCard.css"
import { useNavigate } from 'react-router-dom';

const PostCard = (props) => {
    const navigate = useNavigate()
    //buat btn utk 
    const handleClick = (id) => {
        navigate(`/profile/${id}`)
    }

    return(
        <div className='post-card'>
            <img src={props.PostCardData.PostImage} onClick={() => {handleClick(props.PostCardData.id)}} alt="" />
        </div>
    )
}

export default PostCard