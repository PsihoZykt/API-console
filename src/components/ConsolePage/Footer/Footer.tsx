import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React from 'react'
import './Footer.css'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/store'
import { getCurrentRequest } from 'store/selectors/consolePage/selector'
import { consoleActions } from 'store/actions/console/consoleActions'
import { runRequest } from 'store/thunks/consoleThunks'
import { getFormattedJSON } from 'helpers/json/format'

type ReduxProps = ConnectedProps<typeof connector>
type PropsType = ReduxProps
const Footer = ({
  changeRequestBody,
  currentRequest,
  runRequest,
}: PropsType) => {
  const onFormatting = (body: string) => {
    changeRequestBody(getFormattedJSON(body))
  }

  const onSubmitRequest = async (body: string) => {
    runRequest(body)
  }

  return (
    <div className="footer">
      <button
        onClick={() => onSubmitRequest(currentRequest.requestText)}
        className="footer__submit"
      >
        Отправить
      </button>
      <GithubLink />
      <div className="footer_format">
        <img src={format} alt="some rectangles with different width" />
        <div onClick={() => onFormatting(currentRequest.requestText)}>
          Форматировать
        </div>
      </div>
    </div>
  )
}
const connector = connect(
  (state: RootState) => {
    return {
      currentRequest: getCurrentRequest(state),
    }
  },
  {
    changeRequestBody: consoleActions.changeRequestText,
    runRequest: runRequest,
  }
)
export default connector(Footer)
