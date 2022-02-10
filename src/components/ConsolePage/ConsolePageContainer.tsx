import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ConsolePage from './ConsolePage'

import {
  getCurrentRequest,
  getRequestHistory,
} from '../../store/selectors/consolePage/selector'
import {
  createChangeCurrentRequest,
  createChangeRequestBodyAction,
  createSubmitRequestAction,
  Request,
  RequestStatus,
} from '../../store/reducers/consoleReducer'
import { authWithSession, makeRequest } from '../../api/sendsay'
import { getAuthResult } from '../../store/selectors/loginPage/selector'
import { setAuthResult } from '../../store/reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

interface IProps {
  currentRequest: Request;
}

const ConsolePageContainer = ({
  currentRequest,
  changeRequestBody,
  submitRequest,
  requestHistory,
  changeCurrentRequest,
  auth,
  setAuthResult,
}: any) => {
  const [isRequestError, setIsRequestError] = useState(false)
  const [isResponseError, setIsResponseError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      authWithSession().then((res) => {
        console.log(res)
        setAuthResult(res)
      })
    } else {
      navigate('/')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('sendsay_session')
    navigate('/')
  }

  const onSubmitRequest = (body: string) => {
    let request
    try {
      request = JSON.parse(body)
      console.log(request)

      setIsRequestError(false)
    } catch (e) {
      console.log('Parse error')
      setIsRequestError(true)
    }
    if (request) {
      makeRequest(body).then((res) => {
        // Sendsay returns _ehid only with successful request, so we can use it
        const isSuccessful = !!(res._ehid ?? false)
        const status = isSuccessful
          ? RequestStatus.Successful
          : RequestStatus.Unseccussful

        const id = res['_ehid']
        const requestText = body
        const requestResponse = JSON.stringify(res)
        setIsResponseError(!isSuccessful)
        changeCurrentRequest({ status, id, requestText, requestResponse })
        submitRequest({ status, id, requestText, requestResponse })
      })
    }
  }
  return (
    <ConsolePage
      onSubmitRequest={onSubmitRequest}
      currentRequest={currentRequest}
      changeRequestBody={changeRequestBody}
      requestHistory={requestHistory}
      isRequestError={isRequestError}
      isResponseError={isResponseError}
      auth={auth}
      logout={logout}
    />
  )
}
// export default ConsolePageContainer
export default connect(
  (state: any) => {
    return {
      currentRequest: getCurrentRequest(state),
      requestHistory: getRequestHistory(state),
      auth: getAuthResult(state),
    }
  },
  {
    changeRequestBody: createChangeRequestBodyAction,
    submitRequest: createSubmitRequestAction,
    changeCurrentRequest: createChangeCurrentRequest,
    setAuthResult: setAuthResult,
  }
)(ConsolePageContainer)
