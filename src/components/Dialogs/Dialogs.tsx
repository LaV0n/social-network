import React, { useState } from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Redirect } from 'react-router-dom'
import { FormDataMessageType, InputMessageReduxForm } from './InputMessage/InputMessage'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { addMessage } from '../../redux/DialogsReducer'

const Dialogs = () => {
   const [currentUser, setCurrentUser] = useState(1)
   const dialogs = useAppSelector(state => state.messagesPage.dialogsData)
   const messagesList = dialogs.filter(u => u.id === currentUser)
   const isAuth = useAppSelector(state => state.auth.isAuth)
   const profileAvatar = useAppSelector(state => state.profilePage.profile?.photos?.small)
   const dispatch = useAppDispatch()

   const addMessageHandler = (value: FormDataMessageType) => {
      dispatch(addMessage({ message: value.inputMessage, userId: currentUser }))
   }
   const setCurrentUserHandler = (id: number) => {
      setCurrentUser(id)
   }

   if (!isAuth) return <Redirect to="/login" />

   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogs_items}>
            {dialogs.map(dialog => (
               <DialogItem
                  key={dialog.id}
                  name={dialog.name}
                  id={dialog.id}
                  avatar={dialog.avatar}
                  setCurrentUser={setCurrentUserHandler}
               />
            ))}
         </div>
         <div className={classes.messages}>
            {messagesList[0].messageList.map(message => (
               <Message
                  key={message.id}
                  message={message.message}
                  isOwner={message.owner}
                  profileAvatar={profileAvatar}
                  friendAvatar={messagesList[0].avatar}
               />
            ))}
            <InputMessageReduxForm onSubmit={addMessageHandler} />
         </div>
      </div>
   )
}
export default Dialogs
