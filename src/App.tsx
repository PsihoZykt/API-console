import './App.css'
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { RootState } from './store/store'
import LoginPage from './components/LoginPage/LoginPageContainer'
import ConsolePage from './components/ConsolePage/ConsolePageContainer'
import 'normalize.css'
import { getAuthResult } from 'store/selectors/loginPage/selector'
import { signInWithSession } from 'store/thunks/loginThunks'

type ReduxProps = ConnectedProps<typeof connector>
const App: React.FC<ReduxProps> = ({ authResult, signInWithSession }) => {
  const navigate = useNavigate()
  useEffect(() => {
    signInWithSession()
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

const connector = connect(
  (state: RootState) => {
    return {
      authResult: getAuthResult(state),
    }
  },
  {
    signInWithSession: signInWithSession,
  }
)
export default connector(App)
