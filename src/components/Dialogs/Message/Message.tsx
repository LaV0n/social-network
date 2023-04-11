import React from 'react'
import classes from './../Dialogs.module.css'
import defaultAvatar from '../../../assets/img/userPhoto.png'

type MessageType = {
   message: string
   profileAvatar: string | undefined
   friendAvatar: string
}
const Message = (props: MessageType) => {
   return (
      <div className={classes.message}>
         <img
            src={
               props.friendAvatar
                  ? props.friendAvatar
                  : props.profileAvatar
                  ? props.profileAvatar
                  : defaultAvatar
            }
            alt={'0'}
            className={classes.avatar}
         />
         {props.message}
      </div>
   )
}

export default Message
