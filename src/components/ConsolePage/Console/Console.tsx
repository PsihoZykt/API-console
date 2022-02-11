import React, {ChangeEvent} from 'react'
import Textarea from 'components/ConsolePage/Console/Textarea/Textarea'
import {Request} from "store/reducers/consoleReducer";

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
        <div className={'console__request' + ' ' + getErrorClass(isRequestError)}>
          <div>Запрос</div>
          <Textarea
              onCurrentRequestTextChange={onCurrentRequestTextChange}
              currentRequest={currentRequest}
          />
        </div>
        <div
            className={'console__response' + ' ' + getErrorClass(isResponseError)}
        >
          Ответ
          <pre className="console__response_field">
          {JSON.stringify(JSON.parse(currentRequest.requestResponse), null, 2)}
        </pre>
        </div>
      </div>
  )
}

export default Console
