import React from "react";
import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { profileUserType} from "../../App";

type ProfileType ={
    profile:profileUserType | null
}

const  Profile = (props:ProfileType) => {

    return (
        <div className={classes.content}>
           <ProfileInfo profile={props.profile}/>
           <MyPostsContainer/>
        </div>
    )
}
export default Profile;