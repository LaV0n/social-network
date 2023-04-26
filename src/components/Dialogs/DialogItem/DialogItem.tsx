import React from 'react'
import styles from './DialogsItem.module.css'

type DialogItemType = {
   name: string
   id: number
   avatar: string
   setCurrentUser: (id: number) => void
}

const DialogItem = (props: DialogItemType) => {
   return (
      <div
         className={styles.item + ' ' + styles.active}
         onClick={() => props.setCurrentUser(props.id)}
      >
         <img src={props.avatar} alt={'0'} className={styles.friendImg} />
         <div>{props.name}</div>
      </div>
   )
}

export default DialogItem
