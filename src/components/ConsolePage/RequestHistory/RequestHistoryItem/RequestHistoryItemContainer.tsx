import React, { useEffect, useState } from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem'
import { connect, ConnectedProps } from 'react-redux'
import { consoleActions } from 'store/actions/console/consoleActions'
import { Request } from 'store/reducers/consoleReducer'
import { runRequest } from 'store/thunks/consoleThunks'
type OwnPropsType = {
  request: Request,
}
type ReduxPropsType = ConnectedProps<typeof connector>
type PropsType = OwnPropsType & ReduxPropsType
const RequestHistoryItemContainer = ({
  request,
  changeCurrentRequestText,
  changeRequestResponse,
  deleteRequest,
  runRequest,
}: PropsType) => {
  const onDeleteRequest = (request: Request) => {
    deleteRequest(request)
  }
  const onCopyRequest = (request: Request) => {
    console.log('1')
  }
  const onRunRequest = (request: Request) => {
    runRequest(request.requestText)
  }
  // I Supposed, when you click to request, response-window should be cleared
  // Because, even if request body is former, response can be different
  const onHistoryItemClick = (request: Request) => {
    changeCurrentRequestText(request.requestText)
    changeRequestResponse('{}')
  }

  return (
    <RequestHistoryItem
      onDeleteRequest={onDeleteRequest}
      onCopyRequest={onCopyRequest}
      onRunRequest={onRunRequest}
      onHistoryItemClick={onHistoryItemClick}
      request={request}
    />
  )
}

const connector = connect(null, {
  changeCurrentRequestText: consoleActions.changeRequestText,
  runRequest: runRequest,
  deleteRequest: consoleActions.deleteRequest,
  changeRequestResponse: consoleActions.changeRequestResponse,
})

export default connector(RequestHistoryItemContainer)
