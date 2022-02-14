import React from 'react'
import Textarea from 'components/ConsolePage/Console/Textarea/Textarea'
import './Console.css'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/store'
import {
  getCurrentRequest,
  getIsResponseError,
} from 'store/selectors/consolePage/selector'

type ReduxProps = ConnectedProps<typeof connector>
type PropTypes = ReduxProps
const Console = ({ isResponseError, currentRequest }: PropTypes) => {
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')
  return (
    <div className="console">
      <Textarea />
      <div className={'console__response'}>
        Ответ
        <pre
          className={`console__response_field ${getErrorClass(
            isResponseError
          )}`}
        >
          {currentRequest.requestResponse}
        </pre>
      </div>
    </div>
  )
}
const connector = connect((state: RootState) => {
  return {
    isResponseError: getIsResponseError(state),
    currentRequest: getCurrentRequest(state),
  }
}, {})
export default connector(Console)
