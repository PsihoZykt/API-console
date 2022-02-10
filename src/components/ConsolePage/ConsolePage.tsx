import React from 'react'
import { Request, RequestStatus } from '../../store/reducers/consoleReducer'
import './ConsolePage.css'
import exit from '../../assets/img/consolePage/log-out.svg'
import maximize from '../../assets/img/consolePage/maximize.svg'
import GithubLink from '../../common/GithubLink/GithubLink'
import Logo from '../../common/Logo/Logo'
import format from '../../assets/img/consolePage/format.svg'
import Textarea from './Textarea/Textarea'
import DragElement from '../../common/DragElement/DragElement'

interface IProps {
  currentRequest: Request;
  submitRequest: (body: string) => any;
}

const ConsolePage = ({
  currentRequest,
  onSubmitRequest,
  changeRequestBody,
  requestHistory,
  isRequestError,
  isResponseError,
  auth,
  logout,
}: any) => {
  const onCurrentRequestTextChange = (e: any) => {
    changeRequestBody(e.target.value)
  }

  const getErrorClass = (isError: any) => (isError ? 'error' : '')
  return (
    <div>
      <div className="header">
        <div className="header__left">
          <Logo />
          <div> API-консолька</div>
        </div>
        <div className="header__right">
          <div className="header__login">{auth.res.account}</div>
          <div onClick={logout} className="header__exit">
            <div>Выйти</div>
            <img src={exit} alt="exit symbol" />
          </div>
          <img
            className="header__exit_maximize"
            src={maximize}
            alt="maximize icon"
          />
        </div>
      </div>
      <div>
        <RequestHistory requestHistory={requestHistory} />
      </div>
      <div className="console">
        <div
          className={'console__request' + ' ' + getErrorClass(isRequestError)}
        >
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
            {JSON.stringify(
              JSON.parse(currentRequest.requestResponse),
              null,
              2
            )}
          </pre>
        </div>
      </div>
      <Footer
        onSubmitRequest={onSubmitRequest}
        currentRequest={currentRequest}
      />
    </div>
  )
}
const RequestHistoryItem = ({ status, requestText, id }: any) => {
  const statusClass =
    status === RequestStatus.Successful
      ? 'status_successful'
      : 'status_unsuccessful'
  return (
    <div className="history__item">
      <div className={statusClass} />
      <div>{JSON.parse(requestText).action}</div>
      <DragElement />
    </div>
  )
}

const RequestHistory = ({ requestHistory }: any) => {
  const historyElement = requestHistory.map((request: any) => (
    <RequestHistoryItem
      id={request.id}
      status={request.status}
      requestText={request.requestText}
    />
  ))
  return <div className="history">{historyElement}</div>
}
const Footer = ({ onSubmitRequest, currentRequest }: any) => {
  return (
    <div className="footer">
      <button
        onClick={() => onSubmitRequest(currentRequest.requestText)}
        className="footer_submit"
      >
        Отправить
      </button>
      <GithubLink />
      <div className="footer_format">
        <img src={format} alt="some rectangles with different width" />
        Форматировать
      </div>
    </div>
  )
}
export default ConsolePage
