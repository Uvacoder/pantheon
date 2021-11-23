import { Card } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Post } from "../../../database/entities/post";
import PostContent from "../postContent/PostContent";
import VotePanel from "../votePanel/VotePanel";
import styles from "./FullPostPanel.module.css";

interface Props {
    post: Post;
}
    
const FullPostPanel = ({ post }: Props) => (
    <Link href={"/post/" + post.id}>
        <Card className={styles.FullPostPanel}>
            <VotePanel postId={post.id}/>
            <PostContent post={post} className={styles.TextNoLimit}/>
        </Card>
    </Link>
);

export default FullPostPanel;