import { useNavigate, NavLink, Outlet } from "react-router-dom";
import _ from 'lodash'
import "./ProjectList.scoped.scss"
import SearchInput from "src/components/common/search-input/SearchInput";
import SelectBox from "src/components/common/base-select/SelectBox";
import { useLocation } from "react-router-dom";
import history from "src/utils/history";
import qs from 'query-string';
const Project = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search);
    const changeUrlQuery = (id, value) => {
        const newQueries = { ...queryParams, [id]: value };
        history.push({ search: qs.stringify(newQueries) });
    }
    const selectBoxStyle = {
        padding: '12px 0',
    }
    return (
        <div className="wrap">
            <SearchInput placeholder="원하는 프로젝트를 검색해보세요." />
            <div className="category">
                <span className="main-category">프로젝트</span><b className="sub-category">프로젝트 목록</b>
            </div>
            <div className="top-menu">
                <div className="filter-wrap">
                    <div className="filter-menu filter-menu1">
                        <span className="filter-title">등록 상태</span>
                        <div className="select-box-wrap">
                            <SelectBox style={selectBoxStyle} id="isActive" list={[{ label: "전체", value: "" }, { label: "승인완료", value: true }, { label: "신청접수", value: false }]} defaultValue={true} eventHandler={changeUrlQuery} />
                        </div>
                    </div>
                    {/* <div className="filter-menu filter-menu2">
                        <span className="filter-title">카테고리</span>
                        <div className="category-filter">
                            <SelectBox id="mainCategory" list={[{ label: "전체", value: "" }, { label: "승인완료", value: true }, { label: "신청접수", value: false }]} defaultValue={true} />
                            <SelectBox id="subCategory" list={[{ label: "전체", value: "" }, { label: "승인완료", value: true }, { label: "신청접수", value: false }]} defaultValue={true} />
                        </div>
                    </div> */}
                </div>
                <div className="lnb-menu">
                    <NavLink className="project-link" to={`/projects/list/my?currentPage=1&search=&isActive=true`}>프로젝트</NavLink>
                    <NavLink className="team-link" to={`/projects/list/teams?currentPage=1&search=`}>팀</NavLink>
                    <button className="create-btn" onClick={() => navigate("/projects/create")}>프로젝트 등록</button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default Project