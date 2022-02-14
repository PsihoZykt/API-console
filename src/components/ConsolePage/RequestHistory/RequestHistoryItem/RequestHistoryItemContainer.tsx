import React from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem'
import { connect, ConnectedProps } from 'react-redux'
import { consoleActions } from 'store/actions/console/consoleActions'
import { Request } from 'store/reducers/consoleReducer'

type OwnPropsType = {
  request: Request,
}
type ReduxPropsType = ConnectedProps<typeof connector>
type PropsType = OwnPropsType & ReduxPropsType
const RequestHistoryItemContainer = ({
  request,
  changeCurrentRequestText,
  changeRequestResponse,
}: PropsType) => {
  // I Supposed, when you click to request, response-window should be cleared
  // Because, even if request body is former, response can be different
  const onHistoryItemClick = (request: Request) => {
    changeCurrentRequestText(request.requestText)
    changeRequestResponse('{}')
  }

  return (
    <RequestHistoryItem
      onHistoryItemClick={onHistoryItemClick}
      request={request}
    />
  )
}

const connector = connect(null, {
  changeCurrentRequestText: consoleActions.changeRequestText,
  changeRequestResponse: consoleActions.changeRequestResponse,
})

export default connector(RequestHistoryItemContainer)
