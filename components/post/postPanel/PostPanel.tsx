import { Card } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Post } from "../../../database/entities/post";
import PostContent from "../postContent/PostContent";
import VotePanel from "../votePanel/VotePanel";
import styles from "./PostPanel.module.css";

interface Props {
    post: Post;
}
    
const PostPanel = ({ post }: Props) => (
    <Link href={"/post/" + post.id}>
        <Card className={styles.PostPanel}>
            <VotePanel postId={post.id}/>
            <PostContent post={post} className={styles.TextNoOverflow}/>
        </Card>
    </Link>
);

export default PostPanel;
