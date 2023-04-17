import {
   ProfileReducer,
   ProfilePageType,
   addPost,
   deletePost,
   setStatus,
   setEditMode,
} from './ProfileReducer'

const state: ProfilePageType = {
   postsData: [
      { id: '1', message: 'Hi', likeCount: 5 },
      { id: '2', message: 'I am alive', likeCount: 5 },
      { id: '3', message: 'Who is here?', likeCount: 5 },
   ],
   profile: null,
   status: '',
   editMode: false,
}

test('add post test ->length expect 4', () => {
   const action = addPost('test-value')
   const newState = ProfileReducer(state, action)
   expect(newState.postsData.length).toBe(4)
})

test('delete post test -> length expect 2', () => {
   const action = deletePost('3')
   const newState = ProfileReducer(state, action)
   expect(newState.postsData.length).toBe(2)
})
test('set new status -> expect "new status"', () => {
   const action = setStatus('new status')
   const newState = ProfileReducer(state, action)
   expect(newState.status).toBe('new status')
})
test('set empty status -> expect "no status"', () => {
   const action = setStatus('')
   const newState = ProfileReducer(state, action)
   expect(newState.status).toBe('no status')
})
test('set editMode on', () => {
   const action = setEditMode(true)
   const newState = ProfileReducer(state, action)
   expect(newState.editMode).toBe(true)
})
