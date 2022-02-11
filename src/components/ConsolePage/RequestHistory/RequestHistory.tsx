import { Request } from 'store/reducers/consoleReducer'
import React from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem'
import './RequestHistory.css'
type PropTypes = {
  requestHistory: Array<Request>,
}
const RequestHistory = ({ requestHistory }: PropTypes) => {
  const historyElement = requestHistory.map((request: Request) => (
    <RequestHistoryItem
      id={request.id}
      status={request.status}
      requestText={request.requestText}
    />
  ))
  return <div className="history">{historyElement}</div>
}
export default RequestHistory
