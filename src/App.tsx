import './App.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import 'normalize.css'
import { getAuthResult } from 'store/selectors/loginPage/selector'
import { signInWithSession } from 'store/thunks/loginThunks'
import ConsolePage from 'components/ConsolePage/ConsolePage'
import { LoginPage } from 'components/LoginPage/LoginPage'
import { loginActions } from 'store/actions/login/loginActions'

const App: React.FC = () => {
  const navigate = useNavigate()
  const authResult = useSelector(getAuthResult)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginActions.loginWithSession())
  }, [])
  useEffect(() => {
    if (!authResult.isError && authResult.credentials) {
      navigate('/console')
    } else {
      navigate('/')
    }
  }, [authResult])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/console" element={<ConsolePage />} />
      </Routes>
    </div>
  )
}
export default App
