import "./SelectBox.scoped.scss"
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import history from "src/utils/history";
import qs from 'query-string';
const SelectBox = ({ list, defaultValue, id }) => {
    const [selectedIndex, setIndex] = useState(null);
    const [isActiveModal, setModal] = useState(false);
    const selectBox = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const queryParams = qs.parse(location.search);
    // 리스트 선택
    const select = (value) => {
        setModal(false) // 모달닫기
        // 현재 선택되어있는데 또다시 선택했을때 호출못하게
        if (selectedIndex != value) {
            setIndex(value); // 모달안에 선택된 리스트 활성화
            const newQueries = { ...queryParams, [id]: value };
            history.push({ search: qs.stringify(newQueries) });
        }
    };
    const handleCloseModal = (e) => {
        if (isActiveModal && (!selectBox.current?.contains(e.target))) setModal(false);

    }
    useEffect(() => {
        window.addEventListener("click", handleCloseModal)
        return () => {
            window.removeEventListener("click", handleCloseModal);
        }
    }, [isActiveModal])

    useEffect(() => {
        setIndex(defaultValue);
    }, [])
    return (
        <div className="select-box">
            <div className={isActiveModal ? "tab active-tab" : "tab"} onClick={() => setModal(!isActiveModal)} style={{ backgroundImage: isActiveModal ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }}>
                {
                    list && list.map((elements, index) => {
                        return (
                            String(elements.value) == String(selectedIndex) &&
                            <span className="type" key={index}>{elements.label}</span>
                        )
                    })
                }
            </div>
            {isActiveModal &&
                <div className="list-wrap" ref={selectBox}>
                    {
                        list && list.map((elements, index) => {
                            return (
                                <div key={index} className={String(elements.value) == String(selectedIndex) ? "list selected" : "list"} onClick={() => { select(String(elements.value)) }}>
                                    <span className="type">{elements.label}</span>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div >
    )
}
export default SelectBox