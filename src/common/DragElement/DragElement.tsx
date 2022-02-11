import React from 'react'
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
  className: string,
  onDeleteRequest: (request: Request) => void,
  onCopyRequest: (request: Request) => void,
  onRunRequest: (request: Request) => void,
  request: Request,
}
type StateType = {
  isExpanded: boolean,
  copied: boolean,
}

export class ExpandElement extends DragElement<PropsType, StateType> {
  state: StateType = {
    copied: false,
    isExpanded: false,
  }

  onExpand = () => {
    console.log('asd')
  }
  getExpandedClass = () => {
    return this.state.isExpanded ? 'expand-expanded' : 'expand-hidden'
  }

  render() {
    console.log(this.state)
    return (
      <div className="expand">
        <div
          className="expand-element"
          onClick={() => this.setState({ isExpanded: true })}
        >
          <DragElement />
        </div>
        <div className={this.getExpandedClass()}>
          <div
            onClick={(e) => {
              e.stopPropagation()
              this.props.onRunRequest(this.props.request)
              this.setState({ isExpanded: false })
            }}
          >
            Запустить
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()

              this.props.onCopyRequest(this.props.request)
              this.setState({ isExpanded: false })
            }}
          >
            <CopyToClipboard
              text={this.props.request.requestText}
              onCopy={() => {
                this.setState({ copied: true })
              }}
            >
              <span> Скопировать</span>
            </CopyToClipboard>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()

              this.props.onDeleteRequest(this.props.request)
              this.setState({ isExpanded: false })
            }}
          >
            Удалить
          </div>
        </div>
      </div>
    )
  }
}
