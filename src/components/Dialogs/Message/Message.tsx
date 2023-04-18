import React from 'react'
import classes from './../Dialogs.module.css'

type MessageType = {
   message: string
   profileAvatar: string | null | undefined
   friendAvatar: string
   isOwner: boolean
}

const Message = ({ message, profileAvatar, friendAvatar, isOwner }: MessageType) => {
   return (
      <div className={classes.message}>
         <img
            src={isOwner ? (profileAvatar ? profileAvatar : '') : friendAvatar}
            alt={'0'}
            className={classes.avatar}
         />
         {message}
      </div>
   )
}

export default Message
