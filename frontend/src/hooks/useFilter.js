import {useEffect, useMemo, useState} from "react";

const useFilter = () => {
    const [filter, setFilter] = useState({query: "", sort: ""});
    useMemo(() => {
        localStorage.setItem("filter_sort", filter.sort);
        localStorage.setItem("filter_query", filter.query);
    }, [filter]);

    useEffect(() => {
        setFilter({
            query: localStorage.getItem("filter_query"),
            sort: localStorage.getItem("filter_sort")
        })
    }, [])

    return [filter, setFilter];
}
export default useFilter;