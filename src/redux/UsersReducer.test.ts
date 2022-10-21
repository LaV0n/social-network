import usersReducer, {follow, followSuccess, unfollowSuccess, UsersPageType} from "./UsersReducer";
import {UsersAPI} from "../api/api";

jest.mock("../api/api")
const UsersAPIMock = UsersAPI


let state: UsersPageType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Ann',
                status: 'free',
                followed: false,
                followingInProgress: [],
                location: {city: '', country: ''},
                photos: {small: null, large: null}
            },
            {
                id: 1,
                name: 'Sam',
                status: 'busy',
                followed: false,
                followingInProgress: [],
                location: {city: '', country: ''},
                photos: {small: null, large: null}
            },
            {
                id: 2,
                name: 'Jan',
                status: 'busy',
                followed: true,
                followingInProgress: [],
                location: {city: '', country: ''},
                photos: {small: null, large: null}
            },
            {
                id: 3,
                name: 'Bob',
                status: 'busy',
                followed: false,
                followingInProgress: [],
                location: {city: '', country: ''},
                photos: {small: null, large: null}
            },
        ],
        pageSize: 5,
        totalUserCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('followed success', () => {

    const newState = usersReducer(state, followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollowed success', () => {

    const newState = usersReducer(state, unfollowSuccess(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeFalsy()

})

test('thunk follow success', async () => {

    const result ={
        data:{},
        messages:[],
        fieldsErrors:[],
        resultCode:2
    }

// @ts-ignore
    UsersAPIMock.UnfollowUser.mockReturnValue(result)

    const thunk = follow(1)
    const dispatchMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(2)
})