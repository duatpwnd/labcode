import "./Footer.scoped.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
const SelectBox = () => {
    const [index, indexUpdate] = useState(0);
    const [isTab, modalUpdate] = useState(false);
    const moveLink = (link, index) => {
        window.open(link, '_blank')
        indexUpdate(index);
        modalUpdate(false)
    };

    return (
        <div className="select-box">
            <div className="tab" onClick={() => modalUpdate(!isTab)}>
                {
                    index == 0 ?
                        <div>
                            <img src={require("images/onme_logo_ico.svg").default} alt="ONME" title="ONME" className="ico" />
                            <span className="text">안전하고 쉬운 투자, 온미</span>
                        </div>
                        :
                        <div>
                            <img src={require("images/labcode_logo_ico.svg").default} alt="LABCODE" title="LABCODE" className="ico" />
                            <span className="text">LAB Code 솔루션 구축하는, 스냅태그</span>
                        </div>
                }
            </div>
            {isTab &&
                <div className="list-wrap">
                    <div className="list" onClick={() => { moveLink("https://onme.gallery/", 0) }}>
                        <img src={require("images/onme_logo_ico.svg").default} alt="ONME" title="ONME" className="ico" />
                        <span className="text">안전하고 쉬운 투자, 온미</span>
                    </div>
                    <div className="list" onClick={() => { moveLink("https://onme.gallery/", 1) }}>
                        <img src={require("images/labcode_logo_ico.svg").default} alt="LABCODE" title="LABCODE" className="ico" />
                        <span className="text">LAB Code 솔루션 구축하는, 스냅태그</span>
                    </div>
                </div>
            }
        </div >
    )
}
export default function Footer() {
    return (
        <footer>
            <div className="col1">
                <strong className="snaptag">(주)스냅태그</strong>
                <address><span>경기 성남시 분당구 서현1동 황새울로 354,  8F (13591)</span>     <span>대표이사 : 민경웅, 김정희</span>     <span>대표번호 : <strong>031-628-4350</strong></span>     <span>이메일 : <strong>funny@snaptag.co.kr</strong>
                </span>
                </address>
                <p className="copyright">
                    Copyright Ⓒ 2020 snaptag all rights reserved.
                </p>
                <div className="policy">
                    <Link to="" className="privacy">개인정보처리방침</Link>
                    <Link to="">이용약관</Link>
                    <Link to="/inquiries" state={{ nav: false }}>문의하기</Link>
                    <Link to="/createTeam">신청하기</Link>
                </div>
            </div>
            <div className="col2">
                <b>패밀리 사이트</b>
                <SelectBox />
            </div>
        </footer>
    )
}