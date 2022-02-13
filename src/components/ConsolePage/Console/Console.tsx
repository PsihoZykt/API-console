import React, {ChangeEvent} from 'react'
import Textarea from 'components/ConsolePage/Console/Textarea/Textarea'
import {Request} from "store/reducers/consoleReducer";
import './Console.css'
type PropTypes = {
  isRequestError: boolean,
  isResponseError: boolean,
  onCurrentRequestTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  currentRequest: Request,
  setRequestConsoleWidth: (width: number) => void
  requestConsoleWidth: number

}
const Console = ({
                   isRequestError,
                   isResponseError,
                   onCurrentRequestTextChange,
                   currentRequest,
                   setRequestConsoleWidth,
                   requestConsoleWidth,
                 }: PropTypes) => {
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')

  return (
    <div className="console">
      <Textarea
        onCurrentRequestTextChange={onCurrentRequestTextChange}
        currentRequest={currentRequest}
        isRequestError={isRequestError}
        setRequestConsoleWidth={setRequestConsoleWidth}
        requestConsoleWidth={requestConsoleWidth}
      />
      <div
        className={'console__response'}
      >
        Ответ
        <pre className={`console__response_field ${getErrorClass(isResponseError)}`}>
            {currentRequest.requestResponse}
        </pre>
      </div>
    </div>
  )
}

export default Console
