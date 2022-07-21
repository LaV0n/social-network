import React from "react";
import {addPostActionCreate, changeNewPostActionCreate} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../../App";
import {Dispatch} from "redux";


export type profileStateType = {
    newPost: string
    postsData: postDataType[]
}
export type postDataType = {
    id: number
    message: string
    likeCount: number
}

let mapStateToProps = (state: stateType) => {
    return {
        posts: state.profilePage.postsData,
        newPost: state.profilePage.newPost
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changePost: (text:string)=> {dispatch(changeNewPostActionCreate(text))},
        addPost: () => {dispatch(addPostActionCreate())}
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;