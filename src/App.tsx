import './App.css'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { persistor, store } from './store/store'
import LoginPage from './components/LoginPage/LoginPageContainer'
import ConsolePage from './components/ConsolePage/ConsolePageContainer'
import 'normalize.css'
import { PersistGate } from 'redux-persist/integration/react'
const App = () => (
  <div className="app">
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/console" element={<ConsolePage />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </div>
)

export default App
