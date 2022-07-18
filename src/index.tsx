import React from 'react';
import './index.css';
import store  from "./redux/redux-store";
import App, {stateType} from "./App";
import ReactDOM from "react-dom";


let renderEntireTree = (state:stateType) => {
    ReactDOM.render(
        <App store={store}/>,
        document.getElementById('root')
    );
}
renderEntireTree(store.getState());
store.subscribe(()=>{
    let state=store.getState();
        renderEntireTree(state);
}
);