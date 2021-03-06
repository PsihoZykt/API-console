import { Request } from 'store/reducers/consoleReducer'
import React, { useEffect, useRef, useState } from 'react'
import './RequestHistory.css'
import clear from 'assets/img/consolePage/clear.svg'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/store'
import { getRequestHistory } from 'store/selectors/consolePage/selector'
import { consoleActions } from 'store/actions/console/consoleActions'
import RequestHistoryItem from 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem'

type ReduxProps = ConnectedProps<typeof connector>
type PropsType = ReduxProps
const RequestHistory = ({ requestHistory, clearRequestHistory }: PropsType) => {
  const elRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e: WheelEvent) => {
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
    <RequestHistoryItem key={request.id} request={request} />
  ))
  const onClearRequestHistory = () => {
    clearRequestHistory()
  }
  return (
    <div className="history-wrapper">
      <div ref={elRef} className={`history `}>
        {historyElement}
      </div>
      <div
        className={`history__clear ${scroll ? 'scrolling' : ''}`}
        onClick={() => onClearRequestHistory()}
        tabIndex={0}
      >
        <img src={clear} alt="X symbol" />
      </div>
    </div>
  )
}
const connector = connect(
  (state: RootState) => {
    return {
      requestHistory: getRequestHistory(state),
    }
  },
  { clearRequestHistory: consoleActions.clearRequestHistory }
)
export default connector(RequestHistory)
