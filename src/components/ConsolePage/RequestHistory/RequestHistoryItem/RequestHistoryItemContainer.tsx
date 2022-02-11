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
  addRequestToHistory,
  changeCurrentRequest,
  deleteRequest,
}: PropsType) => {
  const onChangeCurrentRequestText = (body: string) => {
    changeCurrentRequestText(body)
  }
  const onDeleteRequest = (request: Request) => {
    deleteRequest(request)
  }
  const onCopyRequest = (request: Request) => {
    console.log('1')
  }
  const onRunRequest = (request: Request) => {
    addRequestToHistory(request)
    changeCurrentRequest(request)
  }

  return (
    <RequestHistoryItem
      onChangeCurrentRequestText={onChangeCurrentRequestText}
      onDeleteRequest={onDeleteRequest}
      onCopyRequest={onCopyRequest}
      onRunRequest={onRunRequest}
      request={request}
    />
  )
}

const connector = connect(null, {
  changeCurrentRequestText: consoleActions.changeRequestText,
  addRequestToHistory: consoleActions.addRequestToHistory,
  changeCurrentRequest: consoleActions.changeCurrentRequest,
  deleteRequest: consoleActions.deleteRequest,
})

export default connector(RequestHistoryItemContainer)
