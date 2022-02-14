import React, {useEffect, useRef, useState} from 'react'
import './DragElement.css'
import {Request} from 'store/reducers/consoleReducer'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import exp from 'constants'

export class DragElement<T, S> extends React.Component<T, S> {
  render() {
    return (
      <div className={`drag-element`}>
        <div className="drag-element_circle"/>
        <div className="drag-element_circle"/>
        <div className="drag-element_circle"/>
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
  const copyElement = useRef<HTMLDivElement>(null)
  const [fade, setFade] = useState(false)
  const onDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    // If we click on "copy" button, menu remains expanded
    if (copyElement.current && copyElement.current.contains(target)) {
      setIsExpanded(true)
    } else {
      //If we click on 3 dots icon, open menu, otherwise close it
      setIsExpanded(expandElementRef.current && expandElementRef.current === e.target || false)
    }

  }

  useEffect(() => {
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])


  const onRun = () => {
    onRunRequest(request)
  }
  const onDelete = () => {
    onDeleteRequest(request)
  }
  const onCopy = () => {
    onCopyRequest(request)
  }

  const getExpandedClass = () => {
    return isExpanded ? 'expand-expanded' : 'expand-hidden'
  }
  const expandedRef = useRef<HTMLDivElement>(null)
  return (
    <div className="expand">
      <div
        ref={expandElementRef}
        className="expand-element"
      >
        <DragElement/>
        <div
          style={{
            left: leftOffset - 80,
          }}
          ref={expandedRef}
          className={`expand ${getExpandedClass()}`}
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
              onCopy()
            }}
            ref={copyElement}

          >
            <div
              onAnimationEnd={() => {
                setFade(false)
              }}
              className={`copyEvent ${fade ? 'fade' : ''}`}
            >
              Скопировано
            </div>
            <CopyToClipboard text={request.requestText}>
              <div>Скопировать</div>
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

    </div>
  )
}
