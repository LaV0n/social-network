import React from "react";
import { addPostActionCreate, changeNewPostActionCreate} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {storeType} from "../../../redux/redux-store";

type MyPostsTypeContainer = {
   store:storeType
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

const MyPostsContainer = (props: MyPostsTypeContainer) => {

    let changePost =(text:string)=> {
        props.store.dispatch(changeNewPostActionCreate(text))
    };

    let addPost = () => {
        props.store.dispatch(addPostActionCreate());
    }

    return (
       <MyPosts posts={props.store.getState().profilePage.postsData}
                newPost ={props.store.getState().profilePage.newPost}
                changePost={changePost}
                addPost={addPost}

       />
    )
}
export default MyPostsContainer;