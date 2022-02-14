import React, {ChangeEvent, MutableRefObject, useRef} from 'react'
import './Textarea.css'
import {DragElement} from 'common/DragElement/DragElement'
import {connect, ConnectedProps} from "react-redux";
import {getCurrentRequest, getIsRequestError, getRequestConsoleWIdth} from "store/selectors/consolePage/selector";
import {RootState} from "store/store";
import {consoleActions} from "store/actions/console/consoleActions";

type ReduxProps = ConnectedProps<typeof connector>
type PropTypes = ReduxProps
const Textarea = ({
                    currentRequest,
                    setRequestConsoleWidth,
                    requestConsoleWidth,
                    isRequestError,
                    changeRequestText
                  }: PropTypes) => {
  const resizeDrag = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')
  const onChangeRequestText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeRequestText(e.target.value)
  }

  let x: number
  let dx: number
  let wd = requestConsoleWidth;
  const startResize = function (evt: React.MouseEvent<HTMLDivElement>) {
    x = evt.screenX
  }

  const resize = function (evt: MouseEvent) {
    dx = evt.screenX - x
    x = evt.screenX
    wd += dx
    if (wd < 400) wd = 400
    if (wd > window.innerWidth - 400) wd = window.innerWidth - 400
    setRequestConsoleWidth(wd)
  }

  const onDragMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    startResize(evt)
    document.addEventListener('mousemove', resize)
    resizeDrag.current.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', resize)
    })

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', resize)
    })
  }
  return (
    <div className="console__request">
      <div>Запрос</div>

      <div ref={wrapperRef} style={{width: requestConsoleWidth + 'px'}} className={"console__request__textarea_wrapper"}>
    <textarea
      className={`console__request__textarea ${getErrorClass(isRequestError)}`}
      onChange={(e) => onChangeRequestText(e)}
      value={currentRequest.requestText}
    />

        <div
          onMouseDown={(evt) => onDragMouseDown(evt)}
          ref={resizeDrag}
          className="console__resizer"
        >
          <DragElement/>
        </div>
      </div>
    </div>
  )
}

const connector = connect(
  (state: RootState) => {
    return {
      currentRequest: getCurrentRequest(state),
      isRequestError: getIsRequestError(state),
      requestConsoleWidth: getRequestConsoleWIdth(state)
    }
  },
  {changeRequestText: consoleActions.changeRequestText, setRequestConsoleWidth: consoleActions.setRequestConsoleWidth}
)
export default connector(Textarea)
