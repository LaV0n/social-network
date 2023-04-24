import { addMessage, DialogsReducer } from './DialogsReducer'

const initialTestState = {
   dialogsData: [
      {
         id: 1,
         name: 'Triss',
         avatar: require('../assets/img/triss.jpg'),
         messageList: [
            { id: '1', message: 'Hi', owner: false },
            { id: '2', message: 'sleeper', owner: false },
            { id: '3', message: 'How r u?', owner: false },
         ],
      },
      {
         id: 2,
         name: 'Gaunter',
         avatar: require('../assets/img/gaunter.jpeg'),
         messageList: [
            { id: '1', message: 'Hi', owner: false },
            { id: '2', message: 'hi', owner: true },
            { id: '3', message: 'are?', owner: false },
         ],
      },
      {
         id: 3,
         name: 'Letho',
         avatar: require('../assets/img/letho.jpg'),
         messageList: [{ id: '1', message: 'Hi', owner: false }],
      },
      { id: 4, name: 'Yennefer', avatar: require('../assets/img/yennefer.jpg'), messageList: [] },
      { id: 5, name: 'Thaler', avatar: require('../assets/img/thaler.jpg'), messageList: [] },
      { id: 6, name: 'Jaskier', avatar: require('../assets/img/jaskier.jpg'), messageList: [] },
   ],
}
test('add message', () => {
   const action = addMessage({ message: 'wowo', userId: 2 })
   const newState = DialogsReducer(initialTestState, action)
   expect(newState.dialogsData[1].messageList.length).toBe(4)
   expect(newState.dialogsData[1].messageList[3].message).toBe('wowo')
})
