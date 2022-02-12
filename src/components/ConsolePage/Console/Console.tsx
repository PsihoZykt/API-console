import React, {ChangeEvent} from 'react'
import Textarea from 'components/ConsolePage/Console/Textarea/Textarea'
import {Request} from "store/reducers/consoleReducer";
import './Console.css'
type PropTypes = {
  isRequestError: boolean,
  isResponseError: boolean,
  onCurrentRequestTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  currentRequest: Request,

}
const Console = ({isRequestError, isResponseError, onCurrentRequestTextChange, currentRequest}: PropTypes) => {
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')

  return (
      <div className="console">
        <div className={'console__request'}>
          <div>Запрос</div>
          <Textarea
              onCurrentRequestTextChange={onCurrentRequestTextChange}
              currentRequest={currentRequest}
              isRequestError={isRequestError}
          />
        </div>
        <div
            className={'console__response'}
        >
          Ответ
          <pre className={`console__response_field + ' ' + ${getErrorClass(isResponseError)}`}>
          {JSON.stringify(JSON.parse(currentRequest.requestResponse), null, 2)}
        </pre>
        </div>
      </div>
  )
}

export default Console
