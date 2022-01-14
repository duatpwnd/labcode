import { useState } from "react"
import "./Profile.scoped.scss"
const Profile = () => {
    const [company, setCompany] = useState("");
    const [registerNumber, setRegisterNumber] = useState("");
    const [file, setFile] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [manager, setManager] = useState("");
    const [address, setAddress] = useState("");
    return (
        <main>
            <h2>정보 입력</h2>
            <section className="section1">
                <h3 className="h3-title">회사 정보</ h3>
                <p className="message">* 정보를 변경하면 자동으로 저장됩니다.</p>
                <div className="row">
                    <label htmlFor="company">회사명</label>
                    <input type="text" id="company" placeholder="회사명을 입력해주세요." onChange={({ target: { value } }) => setCompany(value)} />
                </div>
                <div className="row">
                    <label htmlFor="registerNumber">사업자등록번호</label>
                    <input type="text" id="registerNumber" placeholder="사업자등록번호를 입력해주세요." onChange={({ target: { value } }) => setRegisterNumber(value)} />
                </div>
                <div className="row">
                    {file}
                    <label >사업자등록증</label>
                    <input type="text" className="input-file" placeholder="사업자등록증을 첨부해주세요." readOnly />
                    <input type="file" id="file" onChange={({ target: { value } }) => setFile(value)} />
                    <label htmlFor="file" className="file">찾아보기</label>
                </div>
                <div className="row">
                    <label htmlFor="address">홈페이지 주소</label>
                    <input type="text" id="address" placeholder="홈페이지 주소를 입력해주세요." onChange={({ target: { value } }) => setAddress(value)} />
                </div>
            </section>
            <section>
                <h3 className="h3-title">담당자 정보</ h3>
                <div className="row">
                    <label htmlFor="manager">담당자명</label>
                    <input type="text" id="manager" placeholder="담당자명을 입력해주세요." onChange={({ target: { value } }) => setManager(value)} />
                </div>
                <div className="row">
                    <label htmlFor="email">메일 주소</label>
                    <input type="text" id="email" placeholder="메일주소를 입력해주세요." onChange={({ target: { value } }) => setEmail(value)} />
                </div>
                <div className="row">
                    <label htmlFor="phone">전화번호</label>
                    <input type="text" id="phone" placeholder="전화번호를 입력해주세요." onChange={({ target: { value } }) => setPhone(value)} />
                </div>
            </section>
        </main >
    )
}
export default Profile