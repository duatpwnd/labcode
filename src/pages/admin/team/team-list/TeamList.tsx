import "./TeamList.scoped.scss"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, ReactElement } from "react";
import history from "src/utils/history";
import axios from "axios";
import apiUrl from "src/utils/api";
import SearchInput from "src/components/common/search-input/SearchInput";
import PaginatedItems from "src/components/common/pagination/Paginate";
const TeamList = () => {
    const navigate = useNavigate();
    const [isActiveBsnImgModal, setActiveBsnImgModal] = useState(-1);
    const [{ data, meta }, setList] = useState<{ [key: string]: any }>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search');
    const currentPage = searchParams.get('currentPage');
    const getTeamList = (page, search) => {
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.team + `?page=${page}&search=${search}&limit=10`)
            .then((result: any) => {
                console.log('팀리스트조회결과:', result);
                setList(result.data)
            });
    }
    useEffect(() => {
        getTeamList(currentPage, search);
    }, [currentPage, search])
    return (
        <main>
            <SearchInput placeholder="회사명 검색" />
            <div className="category">
                <span className="main-category">팀 정보</span><b className="sub-category">팀 목록</b>
            </div>
            {
                data && data.length == 0 ? <p className="guide-message">팀 리스트가 없습니다.</p> : <div className="team-list">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Team_ ID
                                </th>
                                <th>
                                    회사명
                                </th>
                                <th>
                                    가입일자
                                </th>
                                <th>
                                    연락처
                                </th>
                                <th>
                                    사업자 번호
                                </th>
                                <th>
                                    담당자명
                                </th>
                                <th>
                                    담당자 이메일
                                </th>
                                <th>
                                    프로젝트
                                </th>
                                <th>
                                    탈퇴일자
                                </th>
                                <th>
                                    계정상태
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data &&
                                data.map((teams, index) =>
                                    <tr key={index} >
                                        <td className="unique" onClick={() => navigate(`/teams/detail/${teams.id}`)}>
                                            {teams.id}
                                        </td>
                                        <td className="title">{teams.title}</td>
                                        <td>{teams.created.split("T")[0]}</td>
                                        <td>{teams.managerPhone}</td>
                                        <td className="unique" onClick={() => setActiveBsnImgModal(teams.id)}>{teams.businessNumber}</td>
                                        <td>{teams.managerName}</td>
                                        <td className="email">{teams.managerEmail}</td>
                                        <td>
                                            준비중{isActiveBsnImgModal == teams.id &&
                                                <>
                                                    <div className="mask" onClick={() => setActiveBsnImgModal(-1)}></div>
                                                    <embed src={teams.businessImage} className="image-modal" />
                                                </>
                                            }

                                        </td>
                                        <td>준비중</td>
                                        <td>준비중</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }

            {

                data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
            }
        </main >
    )
}
export default TeamList