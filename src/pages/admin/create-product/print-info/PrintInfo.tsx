import "./PrintInfo.scoped.scss"
import { useEffect, useState } from "react"
import CalendarComp from "src/components/common/calendar/Calendar"
import { getFormatDate } from 'src/utils/common';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "src/utils/api";
import { createGlobalStyle } from 'styled-components';
import ConfirmModal from "src/components/common/confirm-modal/ConfirmModal";
import toast from 'react-hot-toast';
const DatePickerWrapperStyles = createGlobalStyle`
    .react-datepicker-wrapper{
        width:200px;
        border-radius: 8px;    
        overflow: hidden;
        vertical-align: middle;
        .react-datepicker__input-container{
            input{
                background: url(${require('images/calender_ico.svg').default}) #f0f1f2 no-repeat center right 16px /
                28px 28px;
                padding: 15px 16px;
                border: 1px solid #f6f7f8;
            }
        }
    }
    @media (max-width: 767px) {
        .react-datepicker-wrapper {
            width: 100%;
        }
    }
`;
const PrintInfo = () => {
    const navigate = useNavigate();
    const [isSavePrintInfo, setSavePrintInfo] = useState(false);
    const [printInfos, setPrintInfos] = useState<{ [key: string]: any }>({});
    const params = useParams();
    const [inputs, setInputs] = useState({
        printDate: getFormatDate(new Date())
    });
    const onChange = (e) => {
        if (e.target && e.target.id == "printOrder") {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        }
        if (typeof e === "string") {
            setInputs({
                ...inputs,
                printDate: e
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value
            })
        }
    };
    const getPrintInfos = () => {
        axios.get(apiUrl.products + `/${params.productId}/product-print-infos`).then((result) => {
            console.log('????????????:', result);
            setPrintInfos(result.data.data);
        })
    }
    const modify = (data) => {
        toast.dismiss();
        let check = /^[0-9]+$/;
        const result = check.test(data.printOrder);
        if (result) {
            axios.patch(apiUrl.products + `/${params.productId}/product-print-infos`, data).then((result) => {
                console.log("??????????????????:", result);
                setSavePrintInfo(true);
            })
        } else {
            toast.error("?????? ????????? ????????? ?????????????????????.")
        }
    }
    useEffect(() => {
        getPrintInfos();
    }, [])
    return (
        <section>
            {
                isSavePrintInfo && <ConfirmModal title="?????? ??????" contents="?????? ????????? ?????????????????????." okEvent={() => setSavePrintInfo(false)} />
            }
            <h3 className="h3-title">?????? ??????</h3>
            <div className="form">
                <div className="row">
                    <label htmlFor="printType" className="print-type">?????? ??????</label>
                    <input type="text" defaultValue={printInfos.printType} onChange={(e) => {
                        onChange(e)
                    }} id="printType" placeholder="?????? ?????? ??????" />
                </div>
                <div className="row">
                    <label htmlFor="printMethod" className="print-method">?????? ??????</label>
                    <input type="text" defaultValue={printInfos.printMethod} onChange={(e) => {
                        onChange(e)
                    }} id="printMethod" placeholder="?????? ?????? ??????" />
                </div>
                <div className="row">
                    <label htmlFor="printingMaterial" className="printing-material">?????? ??????</label>
                    <input type="text" defaultValue={printInfos.printingMaterial} onChange={(e) => {
                        onChange(e)
                    }} id="printingMaterial" placeholder="?????? ?????? ??????" />
                </div>
                <div className="row">
                    <label htmlFor="printCompany" className="print-company">?????????</label>
                    <input type="text" defaultValue={printInfos.printCompany} id="printCompany" onChange={(e) => {
                        onChange(e)
                    }} placeholder="????????? ?????? ??????" />
                </div>
                <div className="row">
                    <label htmlFor="printCopperCompany" className="print-copper-company">?????? ??????</label>
                    <input type="text" defaultValue={printInfos.printCopperCompany} id="printCopperCompany" onChange={(e) => {
                        onChange(e)
                    }} placeholder="?????? ?????? ??????" />
                </div>
                <div className="row">
                    <label htmlFor="printDate" className="print-date">?????? ??????</label>
                    <CalendarComp defaultValue={printInfos.printDate} eventHandler={onChange} />
                    <DatePickerWrapperStyles />
                </div>
                <div className="row">
                    <label htmlFor="printOrder" className="print-order">?????? ??????</label>
                    <input type="text" defaultValue={printInfos.printOrder} id="printOrder" onChange={(e) => {
                        onChange(e)
                    }} placeholder="?????? ?????? ??????" />
                </div>
                <div className="btn-wrap">
                    <button className="cancel-btn" onClick={() => navigate(-1)}>??????</button>
                    <button type="button" className="submit-btn" onClick={() => modify(inputs)}>??????</button>
                </div>
            </div>
        </section>

    )
}
export default PrintInfo