import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import App, {stateType} from "./App";
import ReactDOM from "react-dom";
import {Provider} from "./StoreContext";
import {BrowserRouter} from "react-router-dom";


let renderEntireTree = (state:stateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
       ,document.getElementById('root')
    );
}
renderEntireTree(store.getState());
store.subscribe(()=>{
    let state=store.getState();
        renderEntireTree(state);
}
);