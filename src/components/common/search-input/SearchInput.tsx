import "./SearchInput.scoped.scss"
import _ from 'lodash'
import qs from 'query-string';
import { useLocation } from "react-router-dom";
import history from "src/utils/history";
import { useEffect } from "react";
const debounce = _.debounce;
const SearchInput = ({ placeholder }) => {
    const location = useLocation();
    const queryParams = qs.parse(location.search);
    const search = (keyword) => {
        const newQueries = { ...queryParams, search: keyword };
        history.push({ search: qs.stringify(newQueries) });
    }
    return <div className="search-area">
        <button />
        <input type="text" placeholder={placeholder} onChange={debounce((e) => search(e.target.value), 200)} />
    </div>
}
export default SearchInput