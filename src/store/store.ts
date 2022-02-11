import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer as formReducer} from 'redux-form'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'
import consoleReducer from './reducers/consoleReducer'

const rootReducer = combineReducers({
  loginPage: loginReducer,
  consolePage: consoleReducer,
  form: formReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export default store
