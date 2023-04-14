import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useId } from 'react-use-id-hook'

type DialogsDataType = {
   id: number
   name: string
   avatar: string
   messageList: MessageListType[]
}

type MessageListType = {
   id: number
   message: string
   owner: boolean
}
type InitialStateType = {
   dialogsData: DialogsDataType[]
}

const initialState: InitialStateType = {
   dialogsData: [
      {
         id: 1,
         name: 'Triss',
         avatar: require('../assets/img/triss.jpg'),
         messageList: [
            { id: 1, message: 'Hi', owner: false },
            { id: 2, message: 'sleeper', owner: false },
            { id: 3, message: 'How r u?', owner: false },
         ],
      },
      {
         id: 2,
         name: 'Gaunter',
         avatar: require('../assets/img/gaunter.jpeg'),
         messageList: [
            { id: 1, message: 'Hi', owner: false },
            { id: 2, message: 'hi', owner: true },
            { id: 3, message: 'are?', owner: false },
         ],
      },
      {
         id: 3,
         name: 'Letho',
         avatar: require('../assets/img/letho.jpg'),
         messageList: [{ id: 1, message: 'Hi', owner: false }],
      },
      { id: 4, name: 'Yennefer', avatar: require('../assets/img/yennefer.jpg'), messageList: [] },
      { id: 5, name: 'Thaler', avatar: require('../assets/img/thaler.jpg'), messageList: [] },
      { id: 6, name: 'Jaskier', avatar: require('../assets/img/jaskier.jpg'), messageList: [] },
   ],
}

const slice = createSlice({
   name: 'dialogs',
   initialState,
   reducers: {
      addMessage(state, action: PayloadAction<{ message: string; userId: number }>) {
         const newMessage: MessageListType = {
            id: +useId(),
            message: action.payload.message,
            owner: true,
         }
         state.dialogsData.forEach(u =>
            u.id === action.payload.userId ? u.messageList.push(newMessage) : u
         )
      },
   },
})
export const DialogsReducer = slice.reducer
export const { addMessage } = slice.actions
