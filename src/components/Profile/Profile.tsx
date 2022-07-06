import React from "react";
import classes from './Profile.module.css';
import MyPosts, {profileStateType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileType ={
    profileStage:profileStateType
    addPost:()=>void
    changeNewPost:(value:string)=>void
}
const  Profile = (props:ProfileType) => {
    return (
        <div className={classes.content}>
           <ProfileInfo/>
           <MyPosts profileState={props.profileStage}
                    addPost ={props.addPost}
                    changeNewPost={props.changeNewPost}
           />
        </div>
    )
}
export default Profile;