import GithubLink from "common/GithubLink/GithubLink";
import format from "assets/img/consolePage/format.svg";
import React from "react";
import {Request} from "store/reducers/consoleReducer";

type PropsType = {
    onSubmitRequest: (requestText: string) => void
    currentRequest: Request
}
const Footer = ({ onSubmitRequest, currentRequest }: PropsType) => {
    return (
        <div className="footer">
            <button
                onClick={() => onSubmitRequest(currentRequest.requestText)}
                className="footer__submit"
            >
                Отправить
            </button>
            <GithubLink />
            <div className="footer_format">
                <img src={format} alt="some rectangles with different width" />
                <div> Форматировать </div>
            </div>
        </div>
    )
}
export default Footer
