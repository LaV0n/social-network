import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs, {dialogsDataType, messageDatatype} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {postDataType} from "./components/Profile/MyPosts/MyPosts";
import {ActionsType} from "./redux/state";

type AppType = {
    appState: stateType
    dispatch:(action:ActionsType)=>void
}
export type stateType = {
    messagesPage: messagesPageType
    profilePage: profilePageType
}
type messagesPageType = {
    dialogsData: Array<dialogsDataType>
    messagesData: messageDatatype
}
type profilePageType = {
    postsData: postDataType[]
    newPost: string
}

const App = (props: AppType) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={() =>
                        <Dialogs
                            dialogs={props.appState.messagesPage.dialogsData}
                            message={props.appState.messagesPage.messagesData}
                           dispatch={props.dispatch}
                        />}/>
                    <Route path='/profile' render={() =>
                        <Profile
                            profileStage={props.appState.profilePage}
                            dispatch ={props.dispatch}
                        />}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}
export default App;
