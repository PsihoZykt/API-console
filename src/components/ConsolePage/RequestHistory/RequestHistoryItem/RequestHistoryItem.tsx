import {Request, RequestStatus} from 'store/reducers/consoleReducer'
import './RequestHistoryItem.css'
import React, {useEffect, useRef, useState} from 'react'
import {ExpandElement} from "common/DragElement/DragElement";

type PropTypes = {
  onDeleteRequest: (request: Request) => void,
  onCopyRequest: (request: Request) => void,
  onRunRequest: (request: Request) => void,
  onHistoryItemClick: (request: Request) => void
  request: Request,
}

const RequestHistoryItem =
  ({request, onRunRequest, onHistoryItemClick, onDeleteRequest, onCopyRequest}: PropTypes) => {
    const statusClass = request.status === RequestStatus.Successful
      ? 'status_successful' : 'status_unsuccessful'
    const ref = useRef<HTMLDivElement>(null)
    const [leftOffset, setLeftOffset] = useState<number>(0)
    useEffect(() => {
      ref.current?.addEventListener("click", () => console.log("item"))
    }, [])
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
        <div>{JSON.parse(request.requestText).action}</div>

        <ExpandElement
          onCopyRequest={onCopyRequest}
          onRunRequest={onRunRequest}
          request={request}
          onDeleteRequest={onDeleteRequest}
          leftOffset={leftOffset}
        />
      </div>
    )
  }

export default RequestHistoryItem
