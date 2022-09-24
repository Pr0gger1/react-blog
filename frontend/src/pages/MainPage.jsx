import React, {useEffect, useState} from 'react';
import Filter from "../components/Filter";
import PostList from "../components/PostList";
import {useHttp} from "../hooks/useHttp";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import getPageCount from "../services/pageCount";
import Pagination from "../components/Pagination";
import ToastNotify from "../components/UI/ToastNotify/ToastNotify";


const MainPage = () => {
    const {request, requestError} = useHttp();
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', search: ''});

    const [totalPages, setTotalPages] = useState(1);
    const [postLimit, setPostLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
        await request("/api/post/get/all", "GET", null)
            .then(async response => {
                setPosts([...response]);
                setTotalPages(
                    await getPageCount(response.length, postLimit)
                );
            });
    });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.search);

    const lastIndexPost = postLimit * currentPage;
    const firstPostLimit = lastIndexPost - postLimit;
    const currentPostPage = sortedAndSearchedPosts.slice(firstPostLimit, lastIndexPost);

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <main className="App">
            <div className="main__content">
                <div className="content">
                    <Filter filter={filter} setFilter={setFilter}/>
                    {
                        requestError
                        ?
                            <div className="error__container">Ошибка соединения</div>
                        :
                            fetchError
                        ?
                            <div className="error__container">Произошла ошибка загрузки постов</div>
                        :
                            isLoading
                        ?
                            <div className="loading">Загрузка...</div>
                        :
                            <PostList posts={currentPostPage}/>
                    }
                    <Pagination page={currentPage} totalPages={totalPages} changePage={setCurrentPage}/>

                </div>
                {/*<SideBar/>*/}
            </div>
        </main>
    );
};

export default MainPage;