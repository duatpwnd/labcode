import "./Pagination.scoped.scss"
import { ReactElement } from "react";
const Pagination = ({ currentPage, totalPages, eventHandler }) => {
    const rendering = () => {
        const result: ReactElement[] = [];
        for (let i = 1; i <= totalPages; i++) {
            result.push(<li className={currentPage == i ? "active" : ""} key={i} onClick={() => eventHandler(i, "")}>{i}</li>);
        }
        return result;
    };

    return <ul className="pagination">{
        currentPage != 1 && <li className="prev-page-btn paging-btn" onClick={() => eventHandler(currentPage - 1, "")}></li>}{rendering()}{
            currentPage != totalPages &&
            <li className="next-page-btn paging-btn" onClick={() => eventHandler(currentPage + 1, "")}></li>}
    </ul>;
}
export default Pagination