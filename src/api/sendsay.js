import Sendsay from 'sendsay-api'

const getInstance = (login, sublogin, password) =>
  new Sendsay({ auth: { login, sublogin, password } })

const auth = (login, sublogin, password) =>
  getInstance(login, sublogin, password).request({
    action: 'sys.settings.get',
    list: ['about.id'],
  })
export default auth
