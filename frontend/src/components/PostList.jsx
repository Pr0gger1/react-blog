import React from 'react';
import PostItem from "./PostItem";

import "../styles/Posts.css";

const PostList = ({posts}) => {
    if (!posts.length) {
        return (
            <h1 className="content__posts">На данный момент публикаций нет</h1>
        )
    }
    return (
        <div className="content__posts">
            {posts.map((post) =>
                <PostItem key={post.id} post={post}/>
            )}
        </div>
    );
};

export default PostList;