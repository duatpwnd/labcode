import "./Help.scoped.scss"
const Help = () => {
    return (
        <div className="wrap">
            <h2 className="h2-title">문의하기</h2>
            <p className="guide-msg">담당자가 정식으로 검토하여 빠른 시일 내 연락드리겠습니다.</p>
            <form>
                <fieldset></fieldset>
                <legend>문의하기</legend>
                <div className="row1">
                    <span className="row-span name-field">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" placeholder="이름을 입력해주세요." />
                    </span>
                    <span className="row-span email-field">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" placeholder="이메일 주소를 입력해주세요." />
                    </span>
                </div>
                <div className="row2">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요." />
                </div>
                <div className="row3">
                    <label htmlFor="contents">제휴 내용</label>
                    <textarea id="contents"></textarea>
                </div>
                <div className="row4">
                    <label className="except"></label>
                    <div className="btn-wrap">
                        <button className="cancel-btn">취소</button>
                        <button className="submit-btn">문의 보내기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Help
