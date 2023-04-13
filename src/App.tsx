import React, { Suspense, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Dialogs, { dialogsDataType, messageDatatype } from './components/Dialogs/Dialogs'
import { Redirect, Route } from 'react-router-dom'
import { News } from './components/News/News'
import { Music } from './components/Music/Music'
import { Settings } from './components/Settings/Settings'
import HeaderContainer from './components/Header/HeaderContainer'
import { Login } from './components/Login/Login'
import { initializedAppTC } from './redux/AppReducer'
import { Preloader } from './components/common/preloader/Preloader'
import Profile from './components/Profile/Profile'
import { useAppDispatch, useAppSelector } from './redux/redux-store'

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

export type messagesPageType = {
   dialogsData: Array<dialogsDataType>
   messagesData: messageDatatype
}
export const App = () => {
   const dispatch = useAppDispatch()
   const initialized = useAppSelector(state => state.app.initialized)

   useEffect(() => {
      dispatch(initializedAppTC())
   }, [])

   if (!initialized) {
      return <Preloader />
   }

   return (
      <div className="app-wrapper">
         <Navbar />
         <Redirect to={'/profile/userId?'} />
         <div className={'app-wrapper-content'}>
            <HeaderContainer />
            <div className="app-content">
               <Route path="/dialogs" component={Dialogs} />
               <Route path="/profile/:userId" component={Profile} />
               <Route
                  path="/users"
                  render={() => (
                     <Suspense fallback={<Preloader />}>
                        <UsersContainer />
                     </Suspense>
                  )}
               />
               <Route path="/login" component={Login} />
               <Route path="/news" component={News} />
               <Route path="/music" component={Music} />
               <Route path="/settings" component={Settings} />
            </div>
         </div>
      </div>
   )
}
