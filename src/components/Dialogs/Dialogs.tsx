import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Redirect } from 'react-router-dom'
import { FormDataMessageType, InputMessageReduxForm } from './InputMessage/InputMessage'
import { addMessageActionCreate } from '../../redux/DialogsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'

type DialogsType = {
   addMessageHandler: (value: string) => void
   dialogs: dialogsDataType[]
   messagesList: messageListType[]
   newMessage: string
   isAuth: boolean
   profileAvatar: string
}
export type dialogsDataType = {
   id: number
   name: string
   avatar: string
}
export type messageDatatype = {
   messageList: messageListType[]
}

export type messageListType = {
   id: number
   message: string
   avatar: string
}

const Dialogs = () => {
   const dialogs = useAppSelector(state => state.messagesPage.dialogsData)
   const messagesList = useAppSelector(state => state.messagesPage.messagesData.messageList)
   const isAuth = useAppSelector(state => state.auth.isAuth)
   const profileAvatar = useAppSelector(state => state.profilePage.profile?.photos.small)
   const dispatch = useAppDispatch()

   const addMessage = (value: FormDataMessageType) => {
      dispatch(addMessageActionCreate(value.inputMessage))
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
               />
            ))}
         </div>
         <div className={classes.messages}>
            {messagesList.map(message => (
               <Message
                  key={message.id}
                  message={message.message}
                  profileAvatar={profileAvatar}
                  friendAvatar={message.avatar}
               />
            ))}
            <InputMessageReduxForm onSubmit={addMessage} />
         </div>
      </div>
   )
}
export default Dialogs
