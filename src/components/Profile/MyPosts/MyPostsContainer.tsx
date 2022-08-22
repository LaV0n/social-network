import React from "react";
import {addPostActionCreate} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../../App";
import {Dispatch} from "redux";


export type profileStateType = {
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
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (value:string) => {dispatch(addPostActionCreate(value))}
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;