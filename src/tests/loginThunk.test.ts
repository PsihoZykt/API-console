import thunk, {ThunkDispatch} from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as sendsayAPI from '../api/sendsay'
import {authWithSession} from '../api/sendsay'
import {AuthResult, Credentials, LoginState} from 'store/reducers/loginReducer'
import {signInWithSession} from 'store/thunks/loginThunks'
import {AnyAction} from "redux";
import {ConsoleState} from "store/reducers/consoleReducer";
import {RootState} from "store/store";
import {loginActions} from "store/actions/login/loginActions";

const credentials: Credentials = {
  login: "some-testing-login",
  sublogin: "some-testing-sublogin"
}

const successAuthResult: AuthResult = {
  isError: false,
  credentials: credentials,
  res: [],
}
const errorAuthResult: AuthResult = {
  isError: true,
  credentials: null,
  res: [],
}
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const spy = jest.spyOn(sendsayAPI, 'authWithSession')
let store = mockStore({})
beforeEach(() => {
  store = mockStore({});
})

describe("sign in with session thunk ", () => {

  it('when api returns credentials', async () => {
    spy.mockResolvedValue(successAuthResult)

    await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signInWithSession());
    expect(store.getActions()[0]).toMatchObject(loginActions.setAuthResultAction(successAuthResult))
    expect(store.getActions()[1]).toMatchObject(loginActions.setCredentials(credentials))
  })
  it("when api returns error", async () => {
      spy.mockResolvedValue(errorAuthResult)
      await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signInWithSession());
      expect(store.getActions()[0]).toMatchObject(loginActions.setAuthResultAction(errorAuthResult))
    }
  )
})