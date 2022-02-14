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
    return { isError: true, res: e }
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
    return { isError: true, res: e }
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
    console.log(res)
    return res
  } catch (e) {
    console.log(e)
    return e
  }
}
const logout = async () => {
  const sendsay = new Sendsay()
  try {
    const res = await sendsay.request({
      action: 'logout',
    })
    return { isError: false, res }
  } catch (e) {
    return { isError: true, res: e }
  }
}
const test = async () => {
  const sendsay2 = new Sendsay()

  const res = await sendsay2.request({
    action: 'sys.settings.get',
    session: localStorage.getItem('sendsay_session'),
  })

  console.log(res)
}
export { auth, test, makeRequest, authWithSession, logout }
