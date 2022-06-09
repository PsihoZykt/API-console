// @ts-ignore
import Sendsay from 'sendsay-api'

export interface RequestType {
  isError: boolean;
  res: any;
}
export interface AuthType extends RequestType {
  credentials: {
    login: string,
    sublogin: string,
    password?: string,
  } | null;
}
const auth = async (
  login: string,
  sublogin: string,
  password?: string
): Promise<AuthType & RequestType> => {
  const sendsay = new Sendsay()
  try {
    const res = await sendsay.request({
      action: 'login',
      login,
      sublogin,
      passwd: password,
    })
    localStorage.setItem('sendsay_session', res.session)
    localStorage.setItem('login', login)
    if (sublogin) localStorage.setItem('sublogin', sublogin)
    return { isError: false, credentials: { login, sublogin }, res }
  } catch (e) {
    return { isError: true, credentials: null, res: e }
  }
}
const authWithSession = async (): Promise<AuthType> => {
  const sendsay = new Sendsay()
  const login = localStorage.getItem('login')
  const sublogin = localStorage.getItem('login') // Actually, I don't remember how it should work, so it's just mock
  try {
    const res = await sendsay.request({
      action: 'pong',
      session: localStorage.getItem('sendsay_session'),
    })
    if (login !== null && sublogin !== null) {
      return { isError: false, credentials: { login, sublogin }, res }
    } else throw new Error('Some auth with session problem')
  } catch (e) {
    return { isError: true, credentials: null, res: e }
  }
}
const makeRequest = async (body: string): Promise<RequestType> => {
  const request = JSON.parse(body)
  const sendsay = new Sendsay()
  try {
    const res = await sendsay.request({
      ...request,
      session: localStorage.getItem('sendsay_session'),
    })
    return { isError: false, res }
  } catch (e) {
    return { isError: true, res: e }
  }
}
const logout = async (): Promise<RequestType> => {
  const sendsay = new Sendsay()
  try {
    const res = await sendsay.request({
      action: 'logout',
    })
    localStorage.removeItem('sendsay_session')
    localStorage.removeItem('login')
    localStorage.removeItem('sublogin')
    return { isError: false, res }
  } catch (e) {
    return { isError: true, res: e }
  }
}

export { auth, makeRequest, authWithSession, logout }
