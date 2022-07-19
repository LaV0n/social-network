import React from "react";
import { addPostActionCreate, changeNewPostActionCreate} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

export type profileStateType = {
    newPost: string
    postsData: postDataType[]
}
export type postDataType = {
    id: number
    message: string
    likeCount: number
}

const MyPostsContainer = () => {

    return <StoreContext.Consumer>
        {store =>{
            let changePost =(text:string)=> {
                store.dispatch(changeNewPostActionCreate(text))
            };

            let addPost = () => {
                store.dispatch(addPostActionCreate());
            }
            return <MyPosts posts={store.getState().profilePage.postsData}
                            newPost ={store.getState().profilePage.newPost}
                            changePost={changePost}
                            addPost={addPost}

            />
        }
        }
    </StoreContext.Consumer>
}
export default MyPostsContainer;