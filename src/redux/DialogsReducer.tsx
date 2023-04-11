import { messageListType } from '../components/Dialogs/Dialogs'
import { messagesPageType } from '../App'
import { ActionsType } from './redux-store'

type AddMessageActionType = {
   type: 'ADD-MESSAGE'
   value: string
}

const initialState = {
   dialogsData: [
      { id: 1, name: 'Triss', avatar: require('../assets/img/triss.jpg') },
      { id: 2, name: 'Gaunter', avatar: require('../assets/img/gaunter.jpeg') },
      { id: 3, name: 'Letho', avatar: require('../assets/img/letho.jpg') },
      { id: 4, name: 'Yennefer', avatar: require('../assets/img/yennefer.jpg') },
      { id: 5, name: 'Thaler', avatar: require('../assets/img/thaler.jpg') },
      { id: 6, name: 'Jaskier', avatar: require('../assets/img/jaskier.jpg') },
   ],

   messagesData: {
      messageList: [
         { id: 1, message: 'Hi', avatar: require('../assets/img/triss.jpg') },
         { id: 2, message: 'sleeper', avatar: require('../assets/img/triss.jpg') },
         { id: 3, message: 'How r u?', avatar: require('../assets/img/triss.jpg') },
      ],
   },
}

const DialogsReducer = (
   state: messagesPageType = initialState,
   action: ActionsType
): messagesPageType => {
   switch (action.type) {
      case 'ADD-MESSAGE':
         const message: messageListType = {
            id: 4,
            message: action.value,
            avatar: '',
         }
         return {
            ...state,
            messagesData: {
               ...state.messagesData,
               messageList: [...state.messagesData.messageList, message],
            },
         }
      default:
         return state
   }
}
export const addMessageActionCreate = (value: string): AddMessageActionType => {
   return {
      type: 'ADD-MESSAGE',
      value: value,
   } as const
}

export default DialogsReducer
