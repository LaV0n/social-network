import {
   follow,
   getUsers,
   setCurrentPage,
   toggleFollowingProcess,
   UsersReducer,
   UsersType,
} from './UsersReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { setupStore } from '../utils/test-utils'

const axiosInstance = {
   withCredentials: true,
   headers: { 'API-KEY': '45599275-fc7c-4215-aaa5-a9a36d291e1f' },
}
const mock = new MockAdapter(axios)

const resultData = {
   data: {},
   fieldsErrors: [],
   messages: [],
   resultCode: 0,
}
const usersResultData = {
   items: [
      {
         name: 'BybonIC',
         id: 1607,
         uniqueUrlName: null,
         photos: {
            small: null,
            large: null,
         },
         status: null,
         followed: false,
      },
      {
         name: 'qwerts',
         id: 1606,
         uniqueUrlName: null,
         photos: {
            small: null,
            large: null,
         },
         status: null,
         followed: false,
      },
      {
         name: 'TheRedCrown',
         id: 1605,
         uniqueUrlName: null,
         photos: {
            small: null,
            large: null,
         },
         status: null,
         followed: false,
      },
      {
         name: 'Demiduska',
         id: 1604,
         uniqueUrlName: null,
         photos: {
            small: 'https://social-network.samuraijs.com/activecontent/images/users/1604/user-small.jpg?v=1',
            large: 'https://social-network.samuraijs.com/activecontent/images/users/1604/user.jpg?v=1',
         },
         status: 'Hello, from the other side',
         followed: false,
      },
      {
         name: 'xiitok',
         id: 1603,
         uniqueUrlName: null,
         photos: {
            small: null,
            large: null,
         },
         status: null,
         followed: false,
      },
   ],
   totalCount: 23834,
   error: null,
}
const profileResultData = {
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

const mockNetworkRequests = () => {
   mock.onPost('https://social-network.samuraijs.com/api/1.0/follow/2').reply(200, resultData)
   mock
      .onGet('https://social-network.samuraijs.com/api/1.0/users?page=4647&count=5')
      .reply(200, usersResultData)
   mock.onGet('https://social-network.samuraijs.com/api/1.0/profile/status/25013').reply(200, 123)
   mock
      .onGet('https://social-network.samuraijs.com/api/1.0/profile/25013', {
         withCredentials: true,
         headers: { 'API-KEY': '45599275-fc7c-4215-aaa5-a9a36d291e1f' },
      })
      .reply(200, profileResultData)
}
const unMockNetworkRequests = () => {
   mock.resetHistory()
}

const mockedStore = setupStore()

let state: UsersType
beforeEach(() => {
   state = {
      users: [
         {
            id: 0,
            name: 'Ann',
            status: 'free',
            followed: false,
            location: { city: '', country: '' },
            photos: { small: null, large: null },
         },
         {
            id: 1,
            name: 'Sam',
            status: 'busy',
            followed: false,
            location: { city: '', country: '' },
            photos: { small: null, large: null },
         },
         {
            id: 2,
            name: 'Jan',
            status: 'busy',
            followed: true,
            location: { city: '', country: '' },
            photos: { small: null, large: null },
         },
         {
            id: 3,
            name: 'Bob',
            status: 'busy',
            followed: false,
            location: { city: '', country: '' },
            photos: { small: null, large: null },
         },
      ],
      pageSize: 5,
      totalUserCount: 0,
      currentPage: 1,
      isFetching: false,
      followingInProgress: [],
   }
})
test('set current page -> must be "100"', () => {
   const action = setCurrentPage(100)
   const newState = UsersReducer(state, action)
   expect(newState.currentPage).toBe(100)
})
test('toggle following process on-> must be "true"', () => {
   const action = toggleFollowingProcess({ userId: 1, isFetching: true })
   const newState = UsersReducer(state, action)
   expect(newState.followingInProgress[0]).toBe(1)
})
test('toggle following process off -> must be "false"', () => {
   const actionOn = toggleFollowingProcess({ userId: 1, isFetching: true })
   const actionOff = toggleFollowingProcess({ userId: 1, isFetching: false })
   let newState = UsersReducer(state, actionOn)
   newState = UsersReducer(state, actionOff)
   expect(newState.followingInProgress.length).toBe(0)
})

describe('slice test', () => {
   beforeEach(() => {
      mockNetworkRequests()
   })
   afterEach(() => {
      unMockNetworkRequests()
   })
   test('follow user #2', async () => {
      const { data } = await axios.post('https://social-network.samuraijs.com/api/1.0/follow/2')
      expect(data).toEqual(resultData)
   })
   test('get users api', async () => {
      const { data } = await axios.get(
         'https://social-network.samuraijs.com/api/1.0/users?page=4647&count=5'
      )
      expect(data).toEqual(usersResultData)
   })
   test('get status', async () => {
      const { data } = await axios.get(
         'https://social-network.samuraijs.com/api/1.0/profile/status/25013'
      )
      expect(data).toEqual(123)
   })
   test('get users ', async () => {
      await mockedStore.dispatch(getUsers({ currentPage: 4767, pageSize: 5 }))
      const { id } = mockedStore.getState().usersPage.users[0]
      expect(id).toEqual(1607)
   })
   /*   test('unfollow ', async () => {
      await mockedStore.dispatch(getUserProfile(25013))
      const aboutMe = mockedStore.getState().profilePage.profile?.aboutMe
      const aboutMe2 = setupStore().getState().profilePage.profile?.aboutMe
      expect(aboutMe).toEqual(123)
   })*/
})
test('follow fulfilled"', () => {
   const action = follow.fulfilled(2, '', 2)
   const newState = UsersReducer(state, action)
   expect(newState.users.filter(u => u.id === 2)[0].followed).toBe(false)
})
