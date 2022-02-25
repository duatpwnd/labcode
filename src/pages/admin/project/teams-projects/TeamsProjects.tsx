import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom";
import PaginatedItems from "src/components/common/pagination/Paginate"
import axios from "axios";
import apiUrl from "src/utils/api";
import history from "src/utils/history";
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import "./TeamsProjects.scoped.scss"
const TeamsProjects = () => {
    const [{ data, meta }, setupList] = useState<{ [key: string]: any }>({});
    const [isActiveSlideMenu, setActiveSlideMenu] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const search = searchParams.get('search');
    const getTeamsList = (page, search) => {
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.project + `?search=${search}&page=${page}&limit=16`)
            .then((result: any) => {
                console.log('팀리스트:', result);

                setupList(result.data);
            }).catch((err) => {
                console.log("팀리스트 조회에러:", err);
            })
    }


    useEffect(() => {
        getTeamsList(currentPage, search);
    }, [currentPage, search])
    return (
        <main>
            {
                data &&
                    data.length == 0 ? <p className="message">{message}</p> :
                    <>
                        <div className="slide-area"><button className="slide-btn" onClick={() => setActiveSlideMenu(!isActiveSlideMenu)}>비노조 택베 연합</button><Link to="" className="more-view-btn">전체보기 {">"}</Link></div>
                        <SlideDown>
                            {isActiveSlideMenu ? <ul className="project-list">
                                {
                                    data &&
                                    data.map((list, index) =>
                                        <li className="list" key={index}>
                                            {
                                                list.isActive ? <Link to={`/projects/${list.id}/products?currentPage=1&search=`} className="link" >
                                                    <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" />
                                                </Link> : <div className="link"><div className="mask"></div>
                                                    <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" /></div>

                                            }
                                            <div className="bottom">
                                                <dl>
                                                    <dt>{list.title}</dt>
                                                    <dd>{list.description}</dd>
                                                </dl>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul> : null}
                        </SlideDown>
                    </>
            }
            {
                data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
            }
        </main>
    )
}
export default TeamsProjects