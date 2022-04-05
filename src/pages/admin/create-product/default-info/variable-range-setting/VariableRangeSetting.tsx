import "./VariableRangeSetting.scoped.scss"
import ReactTooltip from 'react-tooltip';
import { useLocation } from 'react-router-dom';
const VariableRangeSetting = ({ inputs, eventHandler }) => {
    const { pathname } = useLocation();
    return (
        <>
            {
                (pathname.startsWith("/products/create") && inputs.project.industryId == 14 || inputs.project.industryId == 16 || inputs.project.industryId == 20 || inputs.project.industryId == 23) &&
                <div className="row variable-range-setting-row">
                    <label>가변 범위 설정</label>
                    <div className="variable-range-setting">
                        <dl>
                            <dt><strong>폴더당 갯수</strong></dt>
                            <dd><input type="tel" id="unit" data-tip data-for="numberPerFolder" placeholder="숫자 입력" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); eventHandler(e) }} /></dd>
                            <p className="message" style={{ visibility: inputs.unit === null || (inputs.unit == 0 && inputs.unit.length > 0) ? 'visible' : 'hidden' }}>숫자 ‘0’, ‘- (마이너스)’가 포함되어 있습니다.</p>
                            <ReactTooltip id="numberPerFolder" type="dark" place="bottom" effect="solid" font-size="122px">
                                <span className="tooltip">1개 폴더에 넣을 수 있는 최대 이미지 수입니다.</span>
                            </ReactTooltip>
                        </dl>

                        <dl>
                            <dt><strong>총 갯수</strong></dt>
                            <dd><input type="tel" id="amount" data-tip data-for="totalCount" placeholder="숫자 입력" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); eventHandler(e) }} /></dd>
                            <p className="message" style={{ visibility: inputs.amount === null || (inputs.unit > inputs.amount && inputs.unit.length > 0) ? 'visible' : 'hidden' }}>총 갯수의 수가 폴더 당 개수보다 작습니다.</p>
                            <ReactTooltip id="totalCount" type="dark" place="bottom" effect="solid" font-size="122px">
                                <span className="tooltip">전체 파일에 넣을 수 있는 총 이미지 수입니다.</span>
                            </ReactTooltip>

                        </dl>
                    </div>
                </div>
            }
        </>
    )
}
export default VariableRangeSetting