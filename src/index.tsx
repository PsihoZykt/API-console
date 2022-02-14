import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { persistor, store } from 'store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
