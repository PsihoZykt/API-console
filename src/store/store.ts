import { applyMiddleware, combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  loginPage: loginReducer,
  form: formReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
