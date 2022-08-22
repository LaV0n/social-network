import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {dialogsDataType, messageDatatype} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {postDataType} from "./components/Profile/MyPosts/MyPostsContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {UsersPageType} from "./redux/UsersReducer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AuthType} from "./redux/AuthReducer";
import Login from "./components/Login/Login";

export type stateType = {
    messagesPage: messagesPageType
    profilePage: profilePageType
    usersPage: UsersPageType
    auth:AuthType
}
export type messagesPageType = {
    dialogsData: Array<dialogsDataType>
    messagesData: messageDatatype
}
export type profilePageType = {
    postsData: postDataType[]
    profile:profileUserType | null
    status:string
}
export type profileUserType  = {
    photos: { small: string, large: string}
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName:string
    userId: number
    aboutMe: string
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube:string,
        github: string,
        mainLink: string
    }
}


const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer/>}
                    />
                    <Route path='/profile/:userId' render={() =>
                        <ProfileContainer/>
                    }/>
                    <Route path='/users' render={() =>
                        <UsersContainer/>
                    }/>
                    <Route path='/login' render={()=>
                    <Login/>
                    }/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}
export default App;
