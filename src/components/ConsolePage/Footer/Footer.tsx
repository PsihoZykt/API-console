import GithubLink from "common/GithubLink/GithubLink";
import format from "assets/img/consolePage/format.svg";
import React, {useEffect} from "react";
import {Request} from "store/reducers/consoleReducer";
import './Footer.css'
type PropsType = {
    onSubmitRequest: (requestText: string) => void
    currentRequest: Request
  onFormatting: (body: string) => void
}
const Footer = ({onSubmitRequest, currentRequest, onFormatting}: PropsType) => {

  return (
    <div className="footer">
      <button
        onClick={() => onSubmitRequest(currentRequest.requestText)}
        className="footer__submit"
      >
        Отправить
      </button>
      <GithubLink/>
      <div className="footer_format">
        <img src={format} alt="some rectangles with different width"/>
        <div onClick={() => onFormatting(currentRequest.requestText)}> Форматировать</div>
      </div>
    </div>
  )
}
export default Footer
