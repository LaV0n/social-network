import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import App, {stateType} from "./App";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom";

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
       ,document.getElementById('root')
    );


