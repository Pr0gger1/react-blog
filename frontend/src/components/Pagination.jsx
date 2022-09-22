import React from 'react';
import usePagination from "../hooks/usePagination";
import Button from "./UI/button/Button";
import "../styles/Pagination.css";

const Pagination = ({totalPages, changePage, page}) => {
    let pageList = usePagination(totalPages);
    if (totalPages !== 1) {
        return (
            <div className="pagination__common">
                {
                    pageList.map(p =>
                        <Button key={p} onClick={() => changePage(p)}
                                customClass={p === page ? "page page__current" : "page"}>
                            {p}
                        </Button>
                    )
                }
            </div>
        );
    }

};

export default Pagination;