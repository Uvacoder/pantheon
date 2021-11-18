import React from "react";
import useSWR from "swr";
import { SearchRes } from "../../../api/interfaces/post";
import { fetcher } from "../../../utils/client/fetcher";
import PostPanel from "../../post/postPanel/PostPanel";
import styles from "./PostsPage.module.css";

interface Props {
    url: string;
    page: number;
}

const PostsPage = ({ url, page }: Props) => {

    const { data } = useSWR<SearchRes>(url + `&page=${page}`, fetcher);

    return (
        <div className={styles.UserPosts}>
            {data?.posts?.map((post, i) => (
                <PostPanel key={i} post={post} />
            ))}
        </div>
    );
}

export default PostsPage;