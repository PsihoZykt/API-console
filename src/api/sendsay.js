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
export { auth, test }
