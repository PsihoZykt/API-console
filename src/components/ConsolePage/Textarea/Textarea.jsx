import React, { useEffect, useRef } from 'react'
import './Textarea.css'
import DragElement from '../../../common/DragElement/DragElement'

const Textarea = ({ onCurrentRequestTextChange, currentRequest }) => {
  const resizeDrag = useRef(null)
  const wrapperRef = useRef(null)
  useEffect(() => {
    var doc = document,
      ht = 400,
      wd = 200,
      main = document.querySelector('#resizable'),
      x,
      // y,
      dx
    // dy

    var startResize = function (evt) {
      x = evt.screenX
      // y = evt.screenY
    }

    var resize = function (evt) {
      dx = evt.screenX - x
      // dy = evt.screenY - y
      x = evt.screenX
      // y = evt.screenY
      wd += dx
      if (wd < 200) wd = 200
      if (wd > 1400) wd = 1400
      // ht -= dy
      main.style.width = wd + 'px'

      // main.style.height = ht + 'px'
    }

    resizeDrag.current.addEventListener('mousedown', function (evt) {
      console.log(evt)
      startResize(evt)
      // wrapperRef.current.addEventListener('mousemove', resize)
      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', resize)
      })
      // resizeDrag.current.addEventListener('mouseleave', function () {
      //   resizeDrag.current.removeEventListener('mousemove', resize)
      // })
    })
  }, [])
  return (
    <div className="cTargetContener" id="idTargetContener">
      <div ref={wrapperRef} id="container">
        <div id="resizable">
          <textarea
            className="console__request_input"
            onChange={onCurrentRequestTextChange}
            value={currentRequest.requestText}
          />
        </div>
        <div ref={resizeDrag} id="rsz">
          <DragElement />
        </div>
      </div>
    </div>
  )
}

export default Textarea
