import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import history from "src/utils/history";
import qs from 'query-string';
const MyPaginate = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "disabled"
})`
    max-width: 470px;
    margin: 0 auto;
    margin-top:100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    li{
        align-self: center;
        flex:0.1;
        text-align:center;
        a{
            cursor: pointer;
            font-family:Poppins;
            display:inline-block;
            color:#525A61;
        }
        &:first-child{
            a{
                vertical-align:middle;
                width:40px;
                height:40px;
                background: url(${require('images/prev_page_ico.svg').default}) no-repeat center center / 40px
                  40px;
            }
        }
        &:last-child{
            a{
                vertical-align:middle;
                width:40px;
                height:40px;
                background: url(${require('images/next_page_ico.svg').default}) no-repeat center center / 40px
                  40px;
            }

        }
    }
    .active {
        a {
            font-weight:700;
            color:#5138E5;
        }
    }
  `;
const PaginatedItems = ({ itemsPerPage, data }) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = Number(searchParams.get('currentPage'));
    const queryParams = qs.parse(location.search);
    useEffect(() => {
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data])
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        const newQueries = { ...queryParams, currentPage: event.selected == 0 ? 1 : event.selected + 1 };
        setItemOffset(newOffset);
        history.push({ search: qs.stringify(newQueries) });
    };
    return (
        <MyPaginate
            forcePage={currentPage - 1}
            nextLabel=""
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel=""
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
    );
}
export default PaginatedItems;