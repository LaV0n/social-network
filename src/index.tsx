import React from 'react';
import './index.css';
import store  from "./redux/state";
import App, {stateType} from "./App";
import ReactDOM from "react-dom";


let renderEntireTree = (state:stateType) => {
    ReactDOM.render(
        <App appState={store.getState()}
             addPost={store.addPost.bind(store)}
             changeNewPost={store.changeNewPost.bind(store)}
             addMessage ={store.addMessage.bind(store)}
             updateMessage ={store.updateMessage.bind(store)}
        />,
        document.getElementById('root')
    );
}
renderEntireTree(store.getState());
store.subscribe(renderEntireTree);