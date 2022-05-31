import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React from 'react'
import './Footer.css'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
import { RootState } from 'store/store'
import { getCurrentRequest } from 'store/selectors/consolePage/selector'
import { consoleActions } from 'store/actions/console/consoleActions'
import { runRequest } from 'store/thunks/consoleThunks'
import { getFormattedJSON } from 'helpers/json/format'

type ReduxProps = ConnectedProps<typeof connector>
type PropsType = ReduxProps
const Footer = ({ changeRequestBody, currentRequest }: PropsType) => {
  const onFormatting = (body: string) => {
    changeRequestBody(getFormattedJSON(body))
  }
  const dispatch = useDispatch()
  const onSubmitRequest = async (body: string) => {
    console.log(body)
    dispatch(consoleActions.runRequest(body))
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
      <div
        tabIndex={0}
        className="footer__format"
        onClick={() => onFormatting(currentRequest.requestText)}
      >
        <img src={format} alt="some rectangles with different width" />
        Форматировать
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
  }
)
export default connector(Footer)
