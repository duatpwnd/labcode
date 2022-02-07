import "./PrintInfo.scoped.scss"
import { useState } from "react"
import CalendarComp from "src/components/common/calendar/Calendar"
import { getFormatDate } from 'src/utils/common';
const PrintInfo = () => {
    const [isCalendarActive, setCalendar] = useState(false);
    const [inputs, setInputs] = useState({
        date: getFormatDate(new Date())
    });
    const onChange = (e) => {
        if (e.target == undefined) {
            console.log(e);
            setInputs({
                ...inputs,
                date: e
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value
            })
        }
    };

    return (
        <section>
            <h3 className="h3-title">인쇄 정보</h3>
            <div className="form">
                <div className="row">
                    <label htmlFor="title" className="hompage-link">인쇄 타입</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="title" className="hompage-link">인쇄 방식</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="title" className="hompage-link">인쇄 재료</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="title" className="hompage-link">인쇄소</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="title" className="hompage-link">동판 업체</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="title" className="hompage-link">인쇄 날짜</label>
                    <CalendarComp eventHandler={onChange} />
                </div>
                <div className="btn-wrap">
                    <button className="cancel-btn">취소</button>
                    <button type="button" className="submit-btn" >수정</button>
                </div>
            </div>
        </section>
    )
}
export default PrintInfo