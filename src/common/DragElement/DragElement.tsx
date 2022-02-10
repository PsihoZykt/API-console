import React from 'react'
import './DragElement.css'
const DragElement = ({ className }: any) => {
  return (
    <div className={`${className} drag-element`}>
      <div className="drag-element_circle" />
      <div className="drag-element_circle" />
      <div className="drag-element_circle" />
    </div>
  )
}

export default DragElement
