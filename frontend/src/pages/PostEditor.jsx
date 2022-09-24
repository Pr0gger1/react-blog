import React, {useContext, useEffect, useState} from 'react';
import TextAreaComponent from "../components/UI/textarea/TextAreaComponent";
import Button from "../components/UI/button/Button";
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/useHttp";
import {useNavigate, useSearchParams} from "react-router-dom";

import "./styles/PostEditor.css";
import {useFetching} from "../hooks/useFetching";

const PostEditor = () => {
    const {userId} = useContext(AuthContext);
    const Navigator = useNavigate();
    const [newPost, setNewPost] = useState({ title: "", description: "", content: ""})
    const {request} = useHttp();

    const [searchParams, setSearchParams] = useSearchParams();
    const [fetching, fetchingError, isLoading] = useFetching(async () => {
        const postId = searchParams.get("id");
        if (postId) {
            await request(`/api/post/get/${postId}`)
                .then(response => setNewPost({
                    title: response[0].title,
                    content: response[0].content,
                    description: response[0].description
                }));
        }
    });

    useEffect(() => {
        fetching();
    }, []);

    const dynamicHeight = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight + 2}px`;
    }
    const createPost = async (e) => {
        if (newPost.title && newPost.content && newPost.description) {
            e.preventDefault();
            let post = {
                ...newPost,
                user_id: userId
            }
            const response = await request("/api/post/add", "POST", {...post});
            setNewPost({title: "", content: "", description: ""});
            if (response) {
                alert(response.message);
            }
            Navigator("/");
        }
        else {
            alert("Заполните пустые поля!")
        }
    }

    return (
        <div className="main__content">
            <div className="editor">
                <TextAreaComponent customClass="post_title__area"
                                   placeholder="Заголовок поста"
                                   maxLength={128}
                                   onInput={dynamicHeight}
                                   onChange={e => setNewPost({...newPost, title: e.target.value})}>
                    {newPost.title}
                </TextAreaComponent>

                <TextAreaComponent customClass="post_description__area"
                                   placeholder="Краткое описание темы поста"
                                   maxLength={512}
                                   onInput={dynamicHeight}
                                   onChange={e => setNewPost({...newPost, description: e.target.value})}>
                    {newPost.description}
                </TextAreaComponent>

                <TextAreaComponent customClass="post_body__area"
                                    placeholder="Основная информация"
                                    onInput={dynamicHeight}
                                    onChange={e => setNewPost({...newPost, content: e.target.value})}>
                    {newPost.content}
                </TextAreaComponent>

                <div className="buttons__panel">
                    <Button customClass="save_post__button" onClick={e => createPost(e)}>Сохранить</Button>
                    <Button customClass="cancel_post__button" onClick={() => Navigator("/")}>Отмена</Button>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;