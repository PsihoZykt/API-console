import Sendsay from 'sendsay-api'
const auth = async (login, sublogin, password) => {
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
const authWithSession = async () => {
  const sendsay = new Sendsay()
  const login = localStorage.getItem('login')
  const sublogin = localStorage.getItem('sublogin')
  try {
    const res = await sendsay.request({
      action: 'pong',
      session: localStorage.getItem('sendsay_session'),
    })
    return { isError: false, credentials: { login, sublogin }, res }
  } catch (e) {
    return { isError: true, credentials: null, res: e }
  }
}
const makeRequest = async (body) => {
  let request = JSON.parse(body)
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
const logout = async () => {
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
