import { Card } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Post } from "../../../model/entities/post.entity";
import PostContent from "../../Post/PostPanel/PostContent/PostContent";
import VotePanel from "../../Post/PostPanel/VotePanel/VotePanel";
import styles from "./FullPostPanel.module.css";

interface Props {
    post: Post;
}
    
const FullPostPanel = ({ post }: Props) => (
    <Card className={styles.FullPostPanel}>
        <VotePanel postId={post.id}/>
        <PostContent post={post}/>
    </Card>
);

export default FullPostPanel;