import {
   ProfileReducer,
   ProfilePageType,
   addPost,
   deletePost,
   setStatus,
   setEditMode,
   getUserProfile,
   getStatus,
} from './ProfileReducer'
import MockAdapter from 'axios-mock-adapter'
import { instance } from '../api/api'
import { setupStore } from '../utils/test-utils'

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

const profileDataRequest = {
   aboutMe: 'meee',
   contacts: {
      facebook: '',
      website: '',
      vk: '',
      twitter: '',
      instagram: '',
      youtube: 'http://news.rr.nihalnavath.com/posts/-0ae83f4c',
      github: 'https://github.com/LaV0n',
      mainLink: '',
   },
   lookingForAJob: false,
   lookingForAJobDescription: 'pleeease',
   fullName: 'LaVon',
   userId: 25013,
   photos: {
      small: 'https://social-network.samuraijs.com/activecontent/images/users/25013/user-small.jpg?v=23',
      large: 'https://social-network.samuraijs.com/activecontent/images/users/25013/user.jpg?v=23',
   },
}

const mock = new MockAdapter(instance, { delayResponse: 100 })
const mockedStore = setupStore({})

const mockNetworkRequests = () => {
   mock.onGet('/profile/25013').reply(200, profileDataRequest)
   mock.onGet('/profile/status/25013').reply(200, '123')
}

const unMockNetworkRequests = () => {
   mock.resetHistory()
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
describe('slice tests', () => {
   beforeEach(() => {
      mockNetworkRequests()
   })
   afterEach(() => {
      unMockNetworkRequests()
   })
   //api tests
   test('get profile api', async () => {
      const { data } = await instance.get('profile/25013')
      expect(data).toEqual(profileDataRequest)
   })
   test('get status api', async () => {
      const { data } = await instance.get('/profile/status/25013')
      expect(data).toBe(123)
   })

   // thunk tests
   test('get profile data', async () => {
      await mockedStore.dispatch(getUserProfile(25013))
      const profileData = mockedStore.getState().profilePage.profile
      expect(profileData).toEqual(profileDataRequest)
   })
   test('get profile status', async () => {
      await mockedStore.dispatch(getStatus(25013))
      const status = mockedStore.getState().profilePage.status
      expect(status).toBe(123)
   })
})
