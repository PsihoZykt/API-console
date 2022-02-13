import { Request } from 'store/reducers/consoleReducer'
import React, { useEffect, useRef, useState } from 'react'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItemContainer'
import './RequestHistory.css'
import clear from 'assets/img/consolePage/clear.svg'
type PropTypes = {
  requestHistory: Array<Request>,
  clearRequestHistory: () => void,
}
const RequestHistory = ({ requestHistory, clearRequestHistory }: PropTypes) => {
  const elRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e: any) => {
        setScroll(true)

        if (e.deltaY == 0) return
        e.preventDefault()

        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 15,
          behavior: 'smooth',
        })

        if (el.offsetWidth + el.scrollLeft + e.deltaY * 15 >= el.scrollWidth) {
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
  const onClearRequestHistory = () => {
    clearRequestHistory()
  }
  return (
    <div className="history-relative">
      <div ref={elRef} className={`history `}>
        {historyElement}
      </div>
      <div
        className={`history__clear ${scroll ? 'scrolling' : ''}`}
        onClick={clearRequestHistory}
      >
        <img src={clear} alt="X symbol" />
      </div>
    </div>
  )
}
export default RequestHistory
