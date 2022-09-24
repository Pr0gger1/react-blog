import React from 'react';
import "../styles/PostItem.css";
import Button from "./UI/button/Button";
import {Link} from "react-router-dom";

const PostItem = ({ post }) => {
    return (
        <section className="post">
            <div className="post__created_at">
                <i className="fa-regular fa-clock"></i>
                {new Date(post.created_at).toLocaleDateString()}
            </div>
            <h2 className="post__title">
                <Link to={`/post/${post.id}`}>
                    {post.title}
                </Link>
            </h2>

            <div className="post__description">
                <Link to={`/post/${post.id}`}>
                    {post.description}
                </Link>
            </div>
            <div className="post__info">
                <Button customClass="post__author">
                    {post.user_id}
                </Button>

                <Button customClass="post__likes">
                    <i className="fa-solid fa-heart"></i>
                    {post.likes}
                </Button>
            </div>

        </section>
    );
};

export default PostItem;