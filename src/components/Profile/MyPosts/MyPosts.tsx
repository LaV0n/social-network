import React from "react";
import classes from './MyPosts.module.css';
import {postDataType} from "./MyPostsContainer";
import Post from "./Posts/Post";
import {FormDataType, PostInputReduxForm} from "./PostInput/PostInput";

type MyPostsType = {
    addPost:(value:string)=>void
    posts:postDataType[]
}

const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.posts.map(message => <Post message={message.message} likeCount={message.likeCount}/>);


    let addPost = (value:FormDataType) => {
        props.addPost(value.postInput);
    }

    return (
        <div className={classes.post_block}>
            <div>
                <h3> New Post</h3>
                <PostInputReduxForm onSubmit={addPost}/>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;