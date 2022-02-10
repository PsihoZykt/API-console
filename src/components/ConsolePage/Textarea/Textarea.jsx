import React, { useEffect, useRef } from 'react'

const Textarea = ({ onCurrentRequestTextChange, currentRequest }: any) => {
  const ref = useRef(null)

  let myszkaWDol, suwakPozycja, startowaWysokoscKontenera
  function touchMouseStart(e: any) {
    e.preventDefault()
    myszkaWDol = true
    if (e.touches) suwakPozycja = e.touches[0].clientY
    else suwakPozycja = e.clientY
  }
  useEffect(() => {
    console.log(ref?.current?.offsetHeight)
  }, [])
  return (
    <div ref={ref} className="container">
      <textarea
        className="console__request_input"
        onChange={onCurrentRequestTextChange}
        value={currentRequest.requestText}
      />
      <div className="resizer"></div>
    </div>
  )
}

export default Textarea
