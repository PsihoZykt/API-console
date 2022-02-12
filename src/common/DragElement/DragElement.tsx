import React, { useEffect, useRef, useState } from 'react'
import './DragElement.css'
import { Request } from 'store/reducers/consoleReducer'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export class DragElement<T, S> extends React.Component<T, S> {
  render() {
    return (
      <div className={`drag-element`}>
        <div className="drag-element_circle" />
        <div className="drag-element_circle" />
        <div className="drag-element_circle" />
      </div>
    )
  }
}

type PropsType = {
  onDeleteRequest: (request: Request) => void,
  onCopyRequest: (request: Request) => void,
  onRunRequest: (request: Request) => void,
  request: Request,
  leftOffset: number,
}

export const ExpandElement = ({
  onCopyRequest,
  onRunRequest,
  onDeleteRequest,
  request,
  leftOffset,
}: PropsType) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandElementRef = useRef<HTMLDivElement>(null)
  const onDocumentClick = (e: MouseEvent) => {
    if (expandElementRef.current !== e.target) {
      setIsExpanded(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  const onExpandClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsExpanded(true)
  }
  const onRun = () => {
    onRunRequest(request)
    setIsExpanded(false)
  }
  const onDelete = () => {
    onDeleteRequest(request)
    setIsExpanded(false)
  }
  const onCopy = () => {
    onCopyRequest(request)
    setIsExpanded(false)
  }
  const getExpandedClass = () => {
    return isExpanded ? 'expand-expanded' : 'expand-hidden'
  }
  const expandedRef = useRef<HTMLDivElement>(null)

  return (
    <div className="expand">
      <div
        onClick={(e) => onExpandClick(e)}
        ref={expandElementRef}
        className="expand-element"
      >
        <DragElement />
      </div>
      <div
        style={{ left: leftOffset - 70 }}
        ref={expandedRef}
        className={getExpandedClass()}
      >
        <div onClick={onRun}>Запустить</div>
        <div onClick={onCopy}>
          <CopyToClipboard text={request.requestText}>
            <span> Скопировать</span>
          </CopyToClipboard>
        </div>
        <div onClick={onDelete}>Удалить</div>
      </div>
    </div>
  )
}
