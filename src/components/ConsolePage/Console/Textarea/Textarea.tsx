import React, {ChangeEvent, MutableRefObject, useRef, useState} from 'react'
import './Textarea.css'
import {DragElement} from 'common/DragElement/DragElement'
import {Request} from "store/reducers/consoleReducer";

type PropTypes = {
  onCurrentRequestTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  currentRequest: Request
}
const Textarea = ({onCurrentRequestTextChange, currentRequest}: PropTypes) => {
  const resizeDrag = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const [width, setWidth] = useState(200)


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
    if (wd < 200) wd = 200
    if (wd > 1400) wd = 1400
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
      <div className="cTargetContener" id="idTargetContener">
        <div ref={wrapperRef} id="container">
          <div style={{width: width + 'px'}} id="resizable">
          <textarea
              className="console__request_input"
              onChange={(e) => onCurrentRequestTextChange(e)}
              value={currentRequest.requestText}
          />
          </div>
          <div
              onMouseDown={(evt) => onDragMouseDown(evt)}
              ref={resizeDrag}
              id="rsz"
          >
            <DragElement/>
          </div>
        </div>
      </div>
  )
}

export default Textarea
