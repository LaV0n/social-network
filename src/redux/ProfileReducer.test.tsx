import { ProfileReducer, addPostActionCreate, deletePostAC } from './ProfileReducer'

const state = {
   postsData: [
      { id: 1, message: 'Hi', likeCount: 5 },
      { id: 2, message: 'I am alive', likeCount: 5 },
      { id: 3, message: 'Who is here?', likeCount: 5 },
   ],
   profile: null,
   status: '',
   editMode: false,
}

test('add post test ->length expect 4', () => {
   const action = addPostActionCreate('test-value')

   const newState = ProfileReducer(state, action)

   expect(newState.postsData.length).toBe(4)
})

test('delete post test -> length expect 2', () => {
   const action = deletePostAC(3)

   const newState = ProfileReducer(state, action)

   expect(newState.postsData.length).toBe(2)
})
