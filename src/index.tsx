import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import App from "./App";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import {BrowserRouter, HashRouter} from "react-router-dom";

    ReactDOM.render(
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
       ,document.getElementById('root')
    );


