import "./TeamList.scoped.scss"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
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
        toast.dismiss();
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.team + `/projects?page=${page}&search=${search}&limit=10`)
            .then((result: any) => {
                console.log('팀리스트조회결과:', result);
                if (result.data.data.length == 0) {
                    toast.error("검색결과가 없습니다.")
                }
                setList(result.data)
            });
    }
    const isExistBsnImg = (id, link) => {
        if (link == null || link == "") {
            setActiveBsnImgModal(-1);
            toast.error('사업자 등록증이 첨부되지 않았습니다.', {
                id: 'clipboard',
            });
        } else {
            setActiveBsnImgModal(id);
        }
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
                data && data.length != 0 && <div className="team-list">
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
                                        <td className="unique" onClick={() => isExistBsnImg(teams.id, teams.businessImage)}>{teams.businessNumber}</td>
                                        <td>{teams.managerName}</td>
                                        <td className="email">{teams.managerEmail}</td>
                                        <td>
                                            {teams.projects.length}{isActiveBsnImgModal == teams.id &&
                                                <>
                                                    <div className="mask" onClick={() => setActiveBsnImgModal(-1)}></div>
                                                    {
                                                        teams.businessImage != null && teams.businessImage != "" && <embed src={teams.businessImage} className="image-modal" width="90%" height="90%" />
                                                    }
                                                </>
                                            }

                                        </td>
                                        <td>준비중</td>
                                        <td>사용중</td>
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