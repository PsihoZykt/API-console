import { Request } from 'store/reducers/consoleReducer'
import React, { useEffect, useRef, useState } from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItemContainer'
import './RequestHistory.css'

type PropTypes = {
  requestHistory: Array<Request>,
}
const RequestHistory = ({ requestHistory }: PropTypes) => {
  const elRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e: any) => {
        if (e.deltaY == 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 15,
          // behavior: 'smooth',
        })
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
  }, [])
  const historyElement = requestHistory.map((request: Request) => (
    <RequestHistoryItem request={request} />
  ))
  return (
    <div className="history-relative">
      <div ref={elRef} className="history">
        {historyElement}
      </div>
    </div>
  )
}
export default RequestHistory
