import React from "react";
import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { profileUserType} from "../../App";

type ProfileType ={
    profile:profileUserType | null
    status:string
    updateStatus:(status: string)=>void
}

const  Profile = (props:ProfileType) => {

    return (
        <div className={classes.content}>
           <ProfileInfo profile={props.profile} status={ props.status} updateStatus = {props.updateStatus}/>
           <MyPostsContainer/>
        </div>
    )
}
export default Profile;