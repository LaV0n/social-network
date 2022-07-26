import React from "react";
import classes from './Post.module.css';
import post_ph from '../../../../assets/img/geralt_post.jpg';

type PostType ={
    message:string
    likeCount: number
}

const Post = (props:PostType) => {

    return (
        <div className={classes.item}>
            <img src={post_ph} alt="0"/>
            {props.message}
            <div>
                <span> likes {props.likeCount}</span>
            </div>
        </div>

    )
}
export default Post;