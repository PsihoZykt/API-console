import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/store'
import {
  getCurrentRequest,
  getIsResponseError,
} from 'store/selectors/consolePage/selector'
import './Response.css'
type ReduxProps = ConnectedProps<typeof connector>
type PropTypes = ReduxProps
const Response = ({ isResponseError, currentRequest }: PropTypes) => {
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')
  return (
    <div className={'response'}>
      Ответ
      <pre className={`response__field ${getErrorClass(isResponseError)}`}>
        {currentRequest.requestResponse}
      </pre>
    </div>
  )
}
const connector = connect((state: RootState) => {
  return {
    isResponseError: getIsResponseError(state),
    currentRequest: getCurrentRequest(state),
  }
}, {})
export default connector(Response)
