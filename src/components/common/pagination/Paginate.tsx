import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import history from "src/utils/history";

const MyPaginate = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "disabled"
})`
    max-width: 470px;
    margin: 0 auto;
    margin-top:100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    padding: 0 5rem;
    li{
        align-self: center;
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
    .previous,
    .next,
    .break{
        a{
         border-color: transparent;
        }
    }
    .active {
        a{
        font-weight:700;
        color:#5138E5;
        }
    }
    .disabled {
        a{
      color: grey;
    }
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;
const PaginatedItems = ({ itemsPerPage, data }) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    const currentPage = searchParams.get('currentPage');
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        history.push({
            search: `?currentPage=${endOffset}&search=${search}`,
        });
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <MyPaginate
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
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
        </>
    );
}
export default PaginatedItems;