import React from 'react'
import './index.css'
import store from './redux/redux-store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { App } from './App'

ReactDOM.render(
   <Provider store={store}>
      <HashRouter>
         <App />
      </HashRouter>
   </Provider>,

   document.getElementById('root')
)
