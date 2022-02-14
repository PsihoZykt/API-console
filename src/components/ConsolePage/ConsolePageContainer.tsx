import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import ConsolePage from './ConsolePage'
import { useNavigate } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { signInWithSession } from 'store/thunks/loginThunks'

type Props = ReduxProps

const ConsolePageContainer = ({ signInWithSession }: Props) => {
  const navigate = useNavigate()
  const fullScreen = useFullScreenHandle()
  useEffect(() => {
    signInWithSession().then((res) => {
      if (res.isError) navigate('/')
    })
  }, [])

  return (
    <FullScreen handle={fullScreen}>
      <ConsolePage fullScreen={fullScreen} />
    </FullScreen>
  )
}

const connector = connect(null, {
  signInWithSession: signInWithSession,
})
type ReduxProps = ConnectedProps<typeof connector>
export default connector(ConsolePageContainer)
