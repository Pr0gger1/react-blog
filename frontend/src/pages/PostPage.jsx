import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/useHttp";
import {useFetching} from "../hooks/useFetching";

import classes from "./styles/PostPage.module.css";
import {AuthContext} from "../context/auth.context";
import Button from "../components/UI/button/Button";

const PostPage = () => {
    const {request} = useHttp();
    const postId = useParams();

    const auth = useContext(AuthContext);
    const Navigate = useNavigate();

    const [post, setPost] = useState([]);

    const [fetching, fetchingError, isLoading] = useFetching(async () => {
        const data = await request(`/api/post/get/${postId.id}`);
        setPost(data[0]);
    })

    useEffect(() => {
        fetching();
    }, []);

    const deletePost = async () => {
        if (window.confirm("Вы действительно хотите удалить этот пост?")){
            const data = await request(`/api/post/get/${postId.id}`, "DELETE");
            alert(data.message)
            Navigate("/");
        }
    }
    const editPost = () => {
        Navigate(`/write-post?id=${postId.id}`)
    }
    return (
        <div className="main__content">
            {
                fetchingError
                    ?
                    <div className="error__container">Ошибка загрузки</div>
                    :
                    isLoading
                        ?
                        <div className="loading">Загрузка</div>
                        :
                        <div className="content">

                            <div className={classes.post_page__info}>
                                <div className={classes.post_page__created_at}>
                                    <i>Дата публикации:</i>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>

                                <div className={classes.post_page__author}>
                                    <i className="fa-regular fa-user"></i>
                                    <Link to={`/user/${post.user_id}`}>
                                        {post.user_id}
                                    </Link>
                                </div>
                                <div className={classes.post_page__likes}>
                                    <i className="fa-solid fa-heart"></i>
                                    {post.likes}
                                </div>

                                {
                                    auth.isAuth && post.user_id === auth.userId
                                    ?
                                        <div className={classes.post__manage}>
                                            <Button customClass={classes.post_btn__delete} onClick={deletePost}>Удалить пост</Button>
                                            <Button customClass={classes.post_btn__edit} onClick={editPost}>Редактировать пост</Button>
                                        </div>
                                    : ""
                                }

                            </div>

                            <div className={classes.post_page__title}>
                                {post.title}
                            </div>
                            <article className={classes.post_page__content}>
                                {post.content}
                            </article>

                        </div>
            }

        </div>
    );
};

export default PostPage;