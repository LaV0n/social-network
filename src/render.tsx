import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {stateType} from './App';
import {addPost, changeNewPost} from "./redux/state";


export let renderEntireTree = (state:stateType) => {
    ReactDOM.render(
        <App appState={state} addPost={addPost} changeNewPost={changeNewPost}/>,
        document.getElementById('root')
    );
}