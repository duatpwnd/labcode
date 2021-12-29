import "./Footer.scoped.scss"
import BaseSelect from "../common/base-select/BaseSelect"
export default function Footer() {
    const handleSelect = (e) => {
        if (e.target.value != "null") {
            window.open(e.target.value, '_blank')
        }
    };

    return (
        <footer>
            <img className="snaptag-logo" src={require("src/assets/images/snaptag_logo.svg").default} />
            <strong className="snaptag">(주)스냅태그</strong>
            <div className="col col1"><div >대표이사 : 민경웅,김정희</div>
                <div >주소 : 경기 성남시 분당구 서현1동 황새울로 354, 8F</div>
                <div>대표번호 : 031-628-4350</div>
            </div>
            <div className="col col2">
                <div>이메일 : funny@snaptag.co.kr</div>
                <span className="policy">개인정보처리방침</span>
                <span>이용약관</span>
                <div>Copyright</div>
            </div>
            <div className="link-wrap">
                <b>패밀리 사이트 이동</b>
                <BaseSelect eventHandler={handleSelect}>
                    <option value="null">Family Site</option>
                    <option value={'https://onme.gallery/'}>ONME</option>
                </BaseSelect>
            </div>
        </footer>
    )
}