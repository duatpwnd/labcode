import "./Production.scoped.scss"
import styled from "styled-components";
const SelectBox = styled.select`
    width: 58px;
    border: 0;
    font-size: 13px;
    color: #333333;
    background: url(${require('images/arrow_bottom.svg').default}) no-repeat right center /
    16px 16px;
`
const Production = () => {
    return (
        <main>
            <SelectBox>
                <option>최신순</option>
            </SelectBox>
            <div style={{ width: "100%;", height: "200px;", overflow: "auto" }}><table>
                <colgroup>
                    <col width="70px" />
                    <col width="110px" />
                    <col width="180px" />
                    <col width="110px" />
                    <col width="110px" />
                    <col width="150px" />
                    <col width="110px" />
                    <col width="110px" />
                    <col width="110px" />
                </colgroup>
                <tr>
                    <th>
                        키
                    </th>
                    <th>
                        제목
                    </th>
                    <th>
                        설명
                    </th>
                    <th>
                        원본 이미지
                    </th>
                    <th>
                        변경 이미지
                    </th>
                    <th>
                        적용기술
                    </th>
                    <th>
                        코드 크기
                    </th>
                    <th>
                        색상변화
                    </th>
                    <th>
                        생성일
                    </th>
                </tr>
                <tr>
                    <td>
                        1
                    </td>
                    <td>제제제제제ㅔ제제제제제제제</td>
                </tr>
            </table>
            </div>
        </main>
    )
}
export default Production