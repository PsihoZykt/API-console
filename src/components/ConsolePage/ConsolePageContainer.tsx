import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import ConsolePage from './ConsolePage'
import { useNavigate } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { signInWithSession } from 'store/thunks/loginThunks'
import { RootState } from 'store/store'
import { loginActions } from 'store/actions/login/loginActions'
import { getAuthResult } from 'store/selectors/loginPage/selector'

type Props = ReduxProps

const ConsolePageContainer = ({ signInWithSession, authResult }: Props) => {
  const navigate = useNavigate()
  const fullScreen = useFullScreenHandle()

  return (
    <FullScreen handle={fullScreen}>
      <ConsolePage fullScreen={fullScreen} />
    </FullScreen>
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
type ReduxProps = ConnectedProps<typeof connector>
export default connector(ConsolePageContainer)
