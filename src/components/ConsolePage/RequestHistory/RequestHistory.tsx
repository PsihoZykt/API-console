import { Request } from 'store/reducers/consoleReducer'
import React, { useEffect, useRef, useState } from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItemContainer'
import './RequestHistory.css'

type PropTypes = {
  requestHistory: Array<Request>,
}
const RequestHistory = ({ requestHistory }: PropTypes) => {
  const elRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e: any) => {
        if (e.deltaY == 0) return
        e.preventDefault()
        setScroll(true)
        console.log(el.offsetWidth + el.scrollLeft)
        console.log(el.scrollWidth)
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 15,
          behavior: 'smooth',
        })
        if (el.offsetWidth + el.scrollLeft >= el.scrollWidth - 30) {
          setScroll(false)
        }
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
      <div ref={elRef} className={`history ${scroll && 'scrolling'}`}>
        {historyElement}
      </div>
    </div>
  )
}
export default RequestHistory
