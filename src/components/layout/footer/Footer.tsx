import "./Footer.scoped.scss"
import { Link } from "react-router-dom";
import SelectBox from "src/components/common/base-select/SelectBox";
const navigate = (link) => {
    window.open(link, '_blank')
}
const selectBoxStyle1 = {
    padding: '22px 0 22px 40px',
    width: "calc(100% - 60px)",
    color: "#79828a",
    fontWeight: 700,
    background: `url(${require("images/onme_logo_ico.svg").default}) no-repeat left center / 24px
          24px`
}
const selectBoxStyle2 = {
    padding: '22px 0 22px 40px',
    width: "calc(100% - 60px)",
    color: "#79828a",
    fontWeight: 700,
    background: `url(${require("images/labcode_logo_ico.svg").default}) no-repeat left center / 24px
    24px`
}
export default function Footer() {
    return (
        <footer>
            <div className="footer-wrap">
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
                        <Link to="/inquiries/create" state={{ nav: false }}>문의하기</Link>
                        <Link to="/teams/create" className="create-team-link">신청하기</Link>
                    </div>
                </div>
                <div className="col2">
                    <b>패밀리 사이트</b>
                    <div className="select-box-wrap">
                        <SelectBox
                            property="label"
                            value="value"
                            style={[selectBoxStyle1, selectBoxStyle2]}
                            list={[{ label: "안전하고 쉬운 투자, 온미", value: "https://onme.gallery/" }, { label: "LAB Code 솔루션 구축하는, 스냅태그", value: "https://snaptag.co.kr/" }]} defaultValue="https://onme.gallery/" eventHandler={navigate} />
                    </div>
                </div>
            </div>
        </footer>
    )
}