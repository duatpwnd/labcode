import "./Footer.scoped.scss"
import BaseSelect from "../common/base-select/BaseSelect"
export default function Footer() {
    return (
        <footer>
            <img src={require("src/assets/images/snaptag_logo.svg").default} />
            <div className="wrap">
                <strong className="snaptag">(주)스냅태그</strong>
                <address>
                    <div className="col"><div >대표이사 : 민경웅,김정희</div><div >주소 : 경기 성남시 분당구 서현동 248-6 8F </div><div>대표번호 : 031-628-4351</div></div>
                    <div className="col"><div>이메일 : funny@snaptag.co.kr</div><span>개인정보처리방침</span><span>이용약관</span>                  <div>Copyright</div>
                    </div>
                    <div className="link-wrap">
                        <b>패밀리 사이트 이동</b>
                        <BaseSelect option={["ONME"]} />
                    </div>
                </address>


            </div>
        </footer>
    )
}