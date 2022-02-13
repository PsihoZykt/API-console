import React, {ChangeEvent, MutableRefObject, useRef, useState} from 'react'
import './Textarea.css'
import {DragElement} from 'common/DragElement/DragElement'
import {Request} from "store/reducers/consoleReducer";

type PropTypes = {
  onCurrentRequestTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  currentRequest: Request
  isRequestError: boolean
}
const Textarea = ({onCurrentRequestTextChange, currentRequest, isRequestError}: PropTypes) => {
  const resizeDrag = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const [width, setWidth] = useState(200)
  const getErrorClass = (isError: boolean) => (isError ? 'error' : '')


  let x: number
  let dx: number
  let wd = width;
  const startResize = function (evt: React.MouseEvent<HTMLDivElement>) {
    x = evt.screenX
  }

  const resize = function (evt: MouseEvent) {
    dx = evt.screenX - x
    x = evt.screenX
    wd += dx
    if (wd < 400) wd = 400
    if (wd > window.innerWidth - 400) wd = window.innerWidth - 400
    setWidth(wd)
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

      <div ref={wrapperRef} style={{width: width + 'px'}} className={"console__request__textarea_wrapper"}>
    <textarea
      className={`console__request__textarea ${getErrorClass(isRequestError)}`}
      onChange={(e) => onCurrentRequestTextChange(e)}
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

export default Textarea
