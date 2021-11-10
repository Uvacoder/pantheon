import React, { useState } from "react";
import { Post } from "../../../database/entities/post";
import PostPanel from "../../post/PostPanel";
import styles from "./UserPosts.module.css";

const UserPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className={styles.UserPosts}>
            {posts.map((post) => (
                <PostPanel post={post} />
            ))}
        </div>
    );
};

export default UserPosts;
