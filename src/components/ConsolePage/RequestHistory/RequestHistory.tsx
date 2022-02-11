import { Request } from 'store/reducers/consoleReducer'
import React from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItemContainer'
import './RequestHistory.css'

type PropTypes = {
  requestHistory: Array<Request>,
}
const RequestHistory = ({ requestHistory }: PropTypes) => {
  const historyElement = requestHistory.map((request: Request) => (
    <RequestHistoryItem request={request} />
  ))
  return <div className="history">{historyElement}</div>
}
export default RequestHistory
