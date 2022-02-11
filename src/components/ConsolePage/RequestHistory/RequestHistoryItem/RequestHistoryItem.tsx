import { Request, RequestStatus } from 'store/reducers/consoleReducer'
import { ExpandElement } from 'common/DragElement/DragElement'
import React from 'react'
import './RequestHistoryItem.css'

type PropTypes = {
  onChangeCurrentRequestText: (body: string) => void,
  onDeleteRequest: (request: Request) => void,
  onCopyRequest: (request: Request) => void,
  onRunRequest: (request: Request) => void,
  request: Request,
}
const RequestHistoryItem = ({
  request,
  onChangeCurrentRequestText,
  onRunRequest,
  onDeleteRequest,
  onCopyRequest,
}: PropTypes) => {
  const statusClass =
    request.status === RequestStatus.Successful
      ? 'status_successful'
      : 'status_unsuccessful'
  return (
    <div
      onClick={() => onChangeCurrentRequestText(request.requestText)}
      // onClick={() => onDeleteRequest(request)}
      className="history__item"
    >
      <div className={statusClass} />
      <div>{JSON.parse(request.requestText).action}</div>
      <ExpandElement
        className="history__item_expand"
        onCopyRequest={onCopyRequest}
        onRunRequest={onRunRequest}
        request={request}
        onDeleteRequest={onDeleteRequest}
      />
    </div>
  )
}

export default RequestHistoryItem
