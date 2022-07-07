import React from 'react';
import './index.css';
import state, {addMessage, addPost, changeNewPost, subscribe, updateMessage} from "./redux/state";
import App, {stateType} from "./App";
import ReactDOM from "react-dom";


let renderEntireTree = (state:stateType) => {
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
renderEntireTree(state);
subscribe(renderEntireTree);