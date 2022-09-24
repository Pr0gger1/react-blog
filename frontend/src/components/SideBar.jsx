import React, {useEffect, useState} from 'react';
import '../styles/SideBar.css';
import {useHttp} from "../hooks/useHttp";
import {useFetching} from "../hooks/useFetching";

const SideBar = () => {
    const {request, requestError, isLoading} = useHttp();
    const [latestPosts, setLatestPosts] = useState([]);
    useFetching( async () => {
        const data = await request("/api/post/get/all", "GET", null);
        setLatestPosts([...data]);
    }, []);
    return (
        <aside className="content__sidebar">
           <p>fdsgsdgrgh</p>
        </aside>
    );
};

export default SideBar;