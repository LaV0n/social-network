import MockAdapter from 'axios-mock-adapter'
import { instance } from '../api/api'
import {
   AuthReducer,
   AuthType,
   getAuthUserData,
   getCaptcha,
   login,
   LoginData,
   logout,
   setAuthUserData,
   setError,
} from './AuthReducer'
import { setupStore } from '../utils/test-utils'

const mock = new MockAdapter(instance, { delayResponse: 100 })
const responseAuthData = {
   data: { id: 1, email: 'test@test.com', login: 'test', captchaURL: null },
   messages: [],
   fieldsErrors: [],
   resultCode: 0,
}
const initialLoginData: LoginData = {
   email: 'test@test.com',
   password: '123',
   rememberMe: false,
   captcha: '',
}
const responseLoginData = {
   data: { userId: 25013 },
   messages: [],
   fieldsErrors: [],
   resultCode: 0,
}
const responseLogoutData = {
   data: {},
   messages: [],
   fieldsErrors: [],
   resultCode: 0,
}
const responseCaptchaData = {
   url: 'captcha',
}
const mockNetworkRequests = () => {
   mock.onGet('auth/me').reply(200, responseAuthData)
   mock.onPost('auth/login', initialLoginData).reply(200, responseLoginData)
   mock.onDelete('auth/login').reply(200, responseLogoutData)
   mock.onGet('security/get-captcha-url').reply(200, responseCaptchaData)
}
const unMockNetworkRequests = () => {
   mock.resetHistory()
}
const mockedStore = setupStore({})

const initialState: AuthType = {
   id: 1,
   email: 'test@test.com',
   login: 'test',
   isAuth: false,
   error: null,
   captchaURL: null,
}

test('set auth user data', () => {
   const testState: AuthType = {
      id: 1,
      email: 'test@test.com',
      login: 'test',
      isAuth: false,
      error: null,
      captchaURL: null,
   }
   const action = setAuthUserData(initialState)
   const newState = AuthReducer(testState, action)
   expect(newState).toEqual(testState)
})
test('set new error', () => {
   const action = setError('newError')
   const newState = AuthReducer(initialState, action)
   expect(newState.error).toBe('newError')
})

describe('slice tests', () => {
   beforeEach(() => {
      mockNetworkRequests()
   })
   afterEach(() => {
      unMockNetworkRequests()
   })
   //api
   test('get auth data api', async () => {
      const { data } = await instance.get('auth/me')
      expect(data).toEqual(responseAuthData)
   })
   test('login api', async () => {
      const { data } = await instance.post('auth/login', initialLoginData)
      expect(data.data.userId).toBe(25013)
   })
   test('logout api', async () => {
      const { data } = await instance.delete('auth/login')
      expect(data).toEqual(responseLogoutData)
   })
   test('captcha api', async () => {
      const { data } = await instance.get('security/get-captcha-url', responseCaptchaData)
      expect(data).toEqual(responseCaptchaData)
   })
   // thunk
   test('get auth data', async () => {
      await mockedStore.dispatch(getAuthUserData())
      const email = mockedStore.getState().auth.email
      expect(email).toEqual(responseAuthData.data.email)
   })
   test('login ', async () => {
      await mockedStore.dispatch(login(initialLoginData))
      const { id, email } = mockedStore.getState().auth
      expect(id).toEqual(1)
      expect(email).toEqual('test@test.com')
   })
   test('logout', async () => {
      await mockedStore.dispatch(logout())
      const id = mockedStore.getState().auth.id
      expect(id).toEqual(null)
   })
   test('captcha', async () => {
      await mockedStore.dispatch(getCaptcha())
      const captcha = mockedStore.getState().auth.captchaURL
      expect(captcha).toEqual(responseCaptchaData.url)
   })
})
