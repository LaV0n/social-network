import React from "react";
import classes from './Profile.module.css';
import MyPosts, {postsDataType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileType ={
    posts:Array<postsDataType>
    addPost:(value:string)=>void
    newPost:string
    changeNewPost:(value:string)=>void
}
const  Profile = (props:ProfileType) => {
    return (
        <div className={classes.content}>
           <ProfileInfo/>
           <MyPosts posts={props.posts}
                    addPost ={props.addPost}
                    newPost={props.newPost}
                    changeNewPost={props.changeNewPost}
           />
        </div>
    )
}
export default Profile;