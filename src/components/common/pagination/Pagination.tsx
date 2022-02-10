import "./Pagination.scoped.scss"
import history from "src/utils/history";
import { ReactElement } from "react";
import { useSearchParams } from 'react-router-dom';
const Pagination = ({ currentPage, totalPages, eventHandler }) => {
    const pageMove = (pageNumber) => {
        eventHandler(pageNumber);
        history.push({
            search: `?currentPage=${pageNumber}`,
        });
    }
    const rendering = () => {
        const result: ReactElement[] = [];
        for (let i = 1; i <= totalPages; i++) {
            result.push(<li className={currentPage == i ? "active" : ""} key={i} onClick={() => pageMove(i)}>{i}</li>);
        }
        return result;
    };

    return <ul className="pagination">{
        currentPage != 1 && totalPages != 1 && <li className="prev-page-btn paging-btn" onClick={() => pageMove(currentPage - 1)}></li>}{rendering()}{
            currentPage != totalPages && totalPages != 1 &&
            <li className="next-page-btn paging-btn" onClick={() => pageMove(currentPage + 1)}></li>}
    </ul>;
}
export default Pagination