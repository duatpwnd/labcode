import "./SelectBox.scoped.scss"
import _ from 'lodash'
import { useEffect, useRef, useState } from "react";
const SelectBox = ({ id, eventHandler, getList, list, defaultValue, style }: any) => {
    const [infiniteList, setInfiniteList] = useState<{ [key: string]: any }[]>([]);
    const [selectedIndex, setIndex] = useState(null);
    const [isActiveModal, setModal] = useState(false);
    const [currentPage, setPage] = useState(1); // 페이징
    const [isLastPage, setLastPage] = useState(false); // 마지막 페이지 유무
    const [title, setTitle] = useState("선택해주세요"); // 팀, 프로젝트 제목
    const debounce = _.debounce;
    // 무한스크롤
    const infiniteScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && isLastPage == false) {
            setPage(currentPage + 1);
            getList(currentPage + 1, "").then((result) => {
                if (result.data.length == 0) {
                    setLastPage(true);
                    return;
                }
                setInfiniteList([...infiniteList, ...result.data]);
            });;
        }
    }
    const selectBox = useRef<HTMLDivElement>(null);
    // 리스트 선택
    const select = (value) => {
        setModal(false) // 모달닫기
        // 현재 선택되어있는데 또다시 선택했을때 호출못하게
        if (selectedIndex != value) {
            setIndex(value); // 모달안에 선택된 리스트 활성화
            eventHandler(id, value);
        }
    };
    const handleCloseModal = (e) => {
        if (isActiveModal && (!selectBox.current?.contains(e.target))) setModal(false);

    }
    const search = (search) => {
        getList(1, search).then((result) => {
            setInfiniteList(result.data);
        });
    }
    useEffect(() => {
        window.addEventListener("click", handleCloseModal)
        return () => {
            window.removeEventListener("click", handleCloseModal);
        }
    }, [isActiveModal])
    useEffect(() => {
        getList && getList(1, "").then((result) => {
            console.log("result", result);
            setInfiniteList([...infiniteList, ...result.data]);
        });
    }, [])
    useEffect(() => {
        setIndex(defaultValue);
    }, [])
    return (
        <div className="select-box">
            <div className={` ${isActiveModal ? "tab active-tab" : "tab"}`} onClick={() => setModal(!isActiveModal)} style={{ backgroundImage: isActiveModal ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }}>
                {list === undefined ?
                    <span className="type" style={style && style}>{title}</span> :
                    list && list.map((elements, index) => {
                        return (
                            String(elements.value) == String(selectedIndex) &&
                            <span className="type" key={index} style={style && style[index] || style} >{elements.label}</span>
                        )
                    })
                }
            </div>
            {
                list === undefined ?
                    isActiveModal &&
                    <div className="toggle-list-wrap" ref={selectBox}>
                        <div className="search-area">
                            <input type="text" autoFocus placeholder="검색" onChange={debounce((e) => search(e.target.value), 200)} />
                            <button />
                        </div>
                        <div className="infinite-list-wrap" onScroll={infiniteScroll}>
                            {
                                infiniteList && infiniteList.map((elements, index) => {
                                    return (
                                        <div key={index} className={elements.id == defaultValue ? "list selected" : "list"} onClick={(e) => { select(String(elements.id)); setTitle((e.target as HTMLElement).innerText) }}>
                                            <span className="type" style={style && style[index] || style}>{elements.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> :
                    isActiveModal &&
                    <div className="list-wrap" ref={selectBox} >
                        {
                            list && list.map((elements, index) => {
                                return (
                                    <div key={index} className={` ${String(elements.value) == String(selectedIndex) ? "list selected" : "list"}`} onClick={() => { select(String(elements.value)) }}>
                                        <span style={style && style[index] || style} className="type">{elements.label}</span>
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