import { applyMiddleware, combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import consoleReducer from './reducers/consoleReducer'

const rootReducer = combineReducers({
  loginPage: loginReducer,
  consolePage: consoleReducer,
  form: formReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export default store
