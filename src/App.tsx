import React, { Suspense } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {dialogsDataType, messageDatatype} from "./components/Dialogs/Dialogs";
import { Redirect, Route, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {postDataType} from "./components/Profile/MyPosts/MyPostsContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersPageType} from "./redux/UsersReducer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AuthType} from "./redux/AuthReducer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import { compose } from 'redux';
import {initializedAppTC} from "./redux/AppReducer";
import {storeType} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";

const UsersContainer=React.lazy(()=>import('./components/Users/UsersContainer'))

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
    editMode:boolean
}
export type profileUserType  = {
    photos: { large: string,small: string}
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?:string
    userId?: number
    aboutMe?: string
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
type AppType={
    initializedAppTC:()=>void
    initialized:boolean
}

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.initializedAppTC()
    };

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
                <div className="app-wrapper">
                    <Navbar/>
                    <Redirect to={'/profile/userId?'}/>
                    <div className={"app-wrapper-content"}>
                        <HeaderContainer/>
                        <div className="app-content">
                            <Route path='/dialogs' render={() =>
                                <DialogsContainer/>}
                            />
                            <Route path='/profile/:userId' render={() =>
                                <ProfileContainer/>
                            }/>
                            <Route path='/users' render={() =>
                                <Suspense fallback={<Preloader/>}>
                                    <UsersContainer/>
                            </Suspense>
                            }/>
                            <Route path='/login' render={() =>
                                <Login/>
                            }/>
                            <Route path='/news' component={News}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state:storeType)=>({
    initialized:state.app.initialized
})

export default compose<React.ComponentType> (
    withRouter,
    connect(mapStateToProps,{initializedAppTC})

) (App)

