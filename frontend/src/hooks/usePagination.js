import {useMemo} from "react";

const usePagination = (totalPages) => {
    return useMemo(() => {
        let pages = [];

        for (let page = 1; page <= totalPages; page++) {
            pages.push(page);
        }
        return pages;
    }, [totalPages])
}

export default usePagination;