import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Posts/Post";

type MyPostsType = {
    profileState: profileStateType
    addPost: () => void
    changeNewPost:(value:string)=>void
}
export type profileStateType = {
    newPost: string
    postsData: postDataType[]
}
export type postDataType = {
    id: number
    message: string
    likeCount: number
}

const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.profileState.postsData.map(message => <Post message={message.message} likeCount={message.likeCount}/>);

    let changePost =(e:ChangeEvent<HTMLTextAreaElement>)=> { props.changeNewPost(e.currentTarget.value)};

    let addPost = () => {
        props.addPost();
    }

    return (
        <div className={classes.post_block}>
            <div>
                <h3> New Post</h3>
                <div>
                    <textarea value={props.profileState.newPost} onChange={changePost}></textarea>
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