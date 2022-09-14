import React from "react";
import classes from './Post.module.css';
import post_ph from '../../../../assets/img/userPhoto.png';

type PostType = {
    message: string
    likeCount: number
    smallAvatar:string | undefined
}

const Post = (props: PostType) => {

    return (
        <div className={classes.item}>
            <img src={props.smallAvatar ? props.smallAvatar : post_ph} alt="0"/>
            <div className={classes.postBlock}>
                <div>  {props.message}</div>
            </div>
            <div style={{fontSize: '0.9rem'}}> <span className={classes.likes}>likes</span> {props.likeCount}</div>
        </div>

    )
}
export default Post;