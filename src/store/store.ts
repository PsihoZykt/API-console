import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer as formReducer} from 'redux-form'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'
import consoleReducer from './reducers/consoleReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';

const rootReducer = combineReducers({
  loginPage: loginReducer,
  consolePage: consoleReducer,
  form: formReducer,
})
const saveSubsetFilter = createFilter('consolePage', ['requestHistory', 'requestConsoleWidth']);
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["consolePage"],
  transform: [saveSubsetFilter]
}
const pReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

const persistor = persistStore(store)
export {persistor, store}