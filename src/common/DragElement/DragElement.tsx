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
  const [fade, setFade] = useState(false)
  const onDocumentClick = (e: MouseEvent) => {
    if (expandElementRef.current !== e.target) {
      setIsExpanded(false)
    }
  }
  useEffect(() => {
    // document.addEventListener('click', onDocumentClick)
    return () => {
      // document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  const onExpand = (e: React.MouseEvent<HTMLDivElement>) => {
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
    // setIsExpanded(false)
  }
  const getExpandedClass = () => {
    return isExpanded ? 'expand-expanded' : 'expand-hidden'
  }
  const expandedRef = useRef<HTMLDivElement>(null)
  return (
    <div className="expand">
      <div
        onClick={(e) => onExpand(e)}
        ref={expandElementRef}
        className="expand-element"
      >
        <DragElement />
      </div>
      <div
        style={{
          left: leftOffset - 80,
        }}
        ref={expandedRef}
        className={getExpandedClass()}
      >
        <div
          className="expand-element__item expand-element__item-run"
          onClick={onRun}
        >
          Запустить
        </div>
        <div
          className={`expand-element__item expand-element__item-copy `}
          onClick={() => {
            setFade(true)
            console.log(fade)
            onCopy()
          }}
        >
          <CopyToClipboard text={request.requestText}>
            <span>
              <div
                onAnimationEnd={() => {
                  console.log('end')
                  setFade(false)
                }}
                className={`copyEvent ${fade ? 'fade' : ''}`}
              >
                Скопировано
              </div>
              Скопировать
            </span>
          </CopyToClipboard>
        </div>
        <div className="delimiter"></div>
        <div
          className="expand-element__item expand-element__item-delete"
          onClick={onDelete}
        >
          Удалить
        </div>
      </div>
    </div>
  )
}
