import { RequestStatus } from 'store/reducers/consoleReducer'
import DragElement from 'common/DragElement/DragElement'
import React from 'react'
import './RequestHistoryItem.css'
type PropTypes = {
  status: RequestStatus,
  requestText: string,
  id: string,
}
const RequestHistoryItem = ({ status, requestText, id }: PropTypes) => {
  const statusClass =
    status === RequestStatus.Successful
      ? 'status_successful'
      : 'status_unsuccessful'
  return (
    <div className="history__item">
      <div className={statusClass} />
      <div>{JSON.parse(requestText).action}</div>
      <DragElement className="history__item_expand" />
    </div>
  )
}

export default RequestHistoryItem
