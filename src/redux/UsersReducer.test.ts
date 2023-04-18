import { follow, UsersReducer, UsersType } from './UsersReducer'
import { UsersAPI } from '../api/api'

jest.mock('../api/api')
const UsersAPIMock = UsersAPI

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
