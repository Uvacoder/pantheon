import React, { useState } from "react";
import { SortType } from "../../database/global";
import styles from "./Posts.module.css";
import PostsPage from "./postsPage/PostsPage";

interface Props {
    sort?: SortType;
    category?: string;
    user?: string;
    width: string;
}

function buildUrl(sort?: string, category?: string, user?: string) {
    let url = "/api/posts/search?";
    if (sort) {
        url += "sort=" + sort;
    } else {
        url += "sort=" + "new";
    }
    if (category) {
        url += "&category=" + category;
    }
    if (user) {
        user += "&poster=" + user;
    }

    return url;
}

const Posts = ({ sort, category, user, width }: Props) => {

    const [cnt, setCnt] = useState(1);

    const url = buildUrl(sort, category, user);

    const pages = []
    for (let i = 0; i < cnt; i++) {
        pages.push(
            <PostsPage 
                url={url} 
                page={i} 
                key={i}
            />
        );
    }

    return (
        <div 
            className={styles.UserPosts}
            style={{
                width: width
            }}
        >
            { pages }
        </div>
    );
}

export default Posts;