import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom";
import PaginatedItems from "src/components/common/pagination/Paginate"
import axios from "axios";
import apiUrl from "src/utils/api";
import history from "src/utils/history";
import MyProjects from "../my-projects/MyProjects";
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import toast from 'react-hot-toast';
import "./TeamsProjects.scoped.scss"
const SlideList = ({ teams }) => {
    const [isActiveSlideMenu, setActiveSlideMenu] = useState(false);
    const moreView = (teamId, teamTitle) => {
        history.push({
            search: `?currentPage=1&search=&isActive=true&teamId=${teamId}&teamTitle=${teamTitle}`,
        });
    }
    return (
        <>
            <div className="slide-area" >
                <button style={{ backgroundImage: isActiveSlideMenu ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }} className="slide-btn" onClick={() => setActiveSlideMenu(!isActiveSlideMenu)}>{teams.title}</button>
                <button className="more-view-btn" onClick={() => moreView(teams.id, teams.title)}>전체보기 {">"}</button>
            </div>
            <SlideDown>
                {isActiveSlideMenu ?
                    <ul className="project-list">
                        {
                            teams.projects.slice(0, 4).map((list, index) =>
                                <li className="list" key={index}>
                                    {
                                        list.isActive ? <Link to={`/products/list?projectId=${list.id}&currentPage=1&search=`} className="link" >
                                            <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" />
                                        </Link> : <div className="link"><div className="mask"></div>
                                            <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" /></div>

                                    }
                                    <div className="bottom">
                                        <p className="desc">{list.description}</p>
                                    </div>
                                </li>
                            )
                        }
                    </ul> : null}
            </SlideDown>
            {/* {

data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
} */}

        </>
    )
}
const TeamsProjects = () => {
    const [{ data, meta }, setupList] = useState<{ [key: string]: any }>({});
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const search = searchParams.get('search');
    const teamId = searchParams.get('teamId')
    const getTeamsList = (page, search) => {
        toast.dismiss();
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.team + `/projects/?search=${search}&page=${page}&limit=16`)
            .then((result: any) => {
                console.log('팀리스트:', result);
                if (result.data.data.length == 0) {
                    toast.error("검색결과가 없습니다.")
                }
                setupList(result.data);
            }).catch((err) => {
                console.log("팀리스트 조회에러:", err);
            })
    }


    useEffect(() => {
        if (teamId == undefined) {
            getTeamsList(currentPage, search);
        }
    }, [currentPage, search])
    return (
        <>
            {
                teamId == undefined ?
                    <main>
                        {
                            data &&
                            data.length != 0 &&
                            <>
                                {

                                    data && data.map((teams, index) =>
                                        <div className="slide-list" key={index}>
                                            <SlideList teams={teams} />
                                        </div>
                                    )
                                }
                            </>
                        }
                        {
                            data && data.length > 0 && <PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />

                        }

                    </main>
                    : <MyProjects />
            }
        </>


    )
}
export default TeamsProjects