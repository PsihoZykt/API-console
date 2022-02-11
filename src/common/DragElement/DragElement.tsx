import React from 'react'
import './DragElement.css'
type PropsType = {
  className?: string,
}
const DragElement: (classname: PropsType) => JSX.Element = ({
  className,
}: PropsType) => {
  return (
    <div className={`${className} drag-element`}>
      <div className="drag-element_circle" />
      <div className="drag-element_circle" />
      <div className="drag-element_circle" />
    </div>
  )
}

export default DragElement
