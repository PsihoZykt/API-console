import './App.css'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './store/store'
import LoginPage from './components/LoginPage/LoginPageContainer'
import ConsolePage from './components/ConsolePage/ConsolePageContainer'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/console" element={<ConsolePage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </div>
)

export default App
