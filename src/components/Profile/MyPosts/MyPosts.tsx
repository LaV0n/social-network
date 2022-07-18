import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import {postDataType} from "./MyPostsContainer";
import Post from "./Posts/Post";

type MyPostsType = {
    newPost: string
    changePost: (value:string) => void
    addPost:()=>void
    posts:postDataType[]
}

const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.posts.map(message => <Post message={message.message} likeCount={message.likeCount}/>);

    let changePost =(e:ChangeEvent<HTMLTextAreaElement>)=> {
        props.changePost(e.currentTarget.value)
    };

    let addPost = () => {
        props.addPost();
    }

    return (
        <div className={classes.post_block}>
            <div>
                <h3> New Post</h3>
                <div>
                    <textarea
                        value={props.newPost}
                        onChange={changePost}
                        placeholder="Enter your message"
                    ></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;