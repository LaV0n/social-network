import React, {ChangeEvent} from "react";
import classes from './MyPosts.module.css';
import Post from "./Posts/Post";

type MyPostsType = {
    posts: Array<postsDataType>
    addPost: (value: string) => void
    newPost: string
    changeNewPost:(value:string)=>void
}
export type postsDataType = {
    id: number
    message: string
    likeCount: number
}
const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.posts.map(message => <Post message={message.message} likeCount={message.likeCount}/>);

    let changePost =(e:ChangeEvent<HTMLTextAreaElement>)=> { props.changeNewPost(e.currentTarget.value)};
    let addPost = () => {
        props.addPost(props.newPost);
    }

    return (
        <div className={classes.post_block}>
            <div>
                <h3> New Post</h3>
                <div>
                    <textarea value={props.newPost} onChange={changePost}></textarea>
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