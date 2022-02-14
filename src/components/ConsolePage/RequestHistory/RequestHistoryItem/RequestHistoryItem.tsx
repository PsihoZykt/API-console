import {Request, RequestStatus} from 'store/reducers/consoleReducer'
import './RequestHistoryItem.css'
import React, {useRef, useState} from 'react'
import ItemMenu from "components/ConsolePage/RequestHistory/RequestHistoryItem/ItemMenu/ItemMenu";

type PropTypes = {
  onHistoryItemClick: (request: Request) => void
  request: Request,
}

const RequestHistoryItem =
  ({request,  onHistoryItemClick}: PropTypes) => {
    const statusClass = request.status === RequestStatus.Successful
      ? 'status_successful' : 'status_unsuccessful'
    const ref = useRef<HTMLDivElement>(null)
    const [leftOffset, setLeftOffset] = useState<number>(0)
    const requestAction = JSON.parse(request.requestText).action
    return (
      <div
        onClickCapture={(e) => {
          setLeftOffset(e.currentTarget.offsetLeft + 55)
          onHistoryItemClick(request)
        }}
        className="history__item"
        ref={ref}
      >
        <div className={statusClass}/>
        <div>{requestAction}</div>

        <ItemMenu
          request={request}
          leftOffset={leftOffset}
        />
      </div>
    )
  }

export default RequestHistoryItem
