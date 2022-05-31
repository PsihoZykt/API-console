// @ts-nocheck
import thunk, {ThunkDispatch} from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as sendsayAPI from 'api/sendsay'
import {AuthResult, Credentials} from 'store/reducers/loginReducer'
import {signIn, signInWithSession} from 'store/thunks/loginThunks'
import {AnyAction} from "redux";
import {RootState} from "store/store";
import {loginActions} from "store/actions/login/loginActions";
import {makeRequest} from "api/sendsay";
import {runRequest} from "store/thunks/consoleThunks";
import {consoleActions} from "store/actions/console/consoleActions";
import {Request, RequestStatus} from "store/reducers/consoleReducer";

const credentials: { login: string, sublogin: string } = {
  login: "some-testing-login",
  sublogin: "some-testing-sublogin",
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
const successConsoleRequest: { isError: boolean, res: any } = {
  isError: false,
  res: {_ehid: "123"} // Sendsay API returns _ehid with successful requests
}
const errorConsoleRequest: { isError: boolean, res: any } = {
  isError: true,
  res: []
}
const newRequest: Request = {
  status: RequestStatus.Successful,
  id: "123",
  requestText: "{\"action\":\"pong\"}",
  requestResponse: "123",
}
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
let store = mockStore({})
beforeEach(() => {
  store = mockStore({});
})

describe("sign in with session thunk ", () => {
  const spy = jest.spyOn(sendsayAPI, 'authWithSession')

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

describe("sign in with credentials thunk ", () => {
  const spy = jest.spyOn(sendsayAPI, "auth")

  it("when api returns credentials", async () => {
    spy.mockResolvedValue(successAuthResult)
    await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signIn(credentials.login, credentials.sublogin, "some-testing-pass"));
    expect(store.getActions()[0]).toMatchObject(loginActions.setIsLoadingAction(true))
    expect(store.getActions()[1]).toMatchObject(loginActions.setCredentials(credentials))
    expect(store.getActions()[2]).toMatchObject(loginActions.setAuthResultAction(successAuthResult))
    expect(store.getActions()[3]).toMatchObject(loginActions.setIsLoadingAction(false))
    expect(store.getActions().length).toBe(4)
    console.log(store.getActions())
  })

  it("when api returns error", async () => {

    spy.mockResolvedValue(errorAuthResult)
    await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(signIn(credentials.login, credentials.sublogin, "some-testing-pass"));
    expect(store.getActions()[0]).toMatchObject(loginActions.setIsLoadingAction(true))
    expect(store.getActions()[1]).toMatchObject(loginActions.setAuthResultAction(errorAuthResult))
    expect(store.getActions()[2]).toMatchObject(loginActions.setIsLoadingAction(false))
    expect(store.getActions().length).toBe(3)
  })
})

describe("run request thunk", () => {
  const spy = jest.spyOn(sendsayAPI, "makeRequest")

  it("with correct json and correct request", async () => {
    spy.mockResolvedValue(successConsoleRequest)
    await (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(runRequest(newRequest.requestText));
    expect(store.getActions()[0]).toMatchObject(consoleActions.setIsRequestError(false))
    expect(store.getActions()[1]).toMatchObject(consoleActions.setIsResponseError(false))
    expect(store.getActions()[2].payload).toEqual(expect.objectContaining({
      status: 0,
      id: expect.any(String),
      requestText: newRequest.requestText,
      requestResponse: expect.any(String),
    }))
    expect(store.getActions()[3].payload).toEqual(expect.objectContaining({
      status: 0,
      id: expect.any(String),
      requestText: newRequest.requestText,
      requestResponse: expect.any(String),
    }))

    expect(store.getActions().length).toBe(4)
  })


})
