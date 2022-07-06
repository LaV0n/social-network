import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {stateType} from './App';
import {addMessage, addPost, changeNewPost, updateMessage} from "./redux/state";


export let renderEntireTree = (state:stateType) => {
    ReactDOM.render(
        <App appState={state}
             addPost={addPost}
             changeNewPost={changeNewPost}
             addMessage ={addMessage}
             updateMessage ={updateMessage}
        />,
        document.getElementById('root')
    );
}