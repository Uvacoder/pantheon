import { Card, Text, Title } from "@mantine/core";
import React from "react";
import { ChevronDown, ChevronUp, Heart, Link2, MessageSquare } from "react-feather";
import { Post } from "../../database/entities/post";
import AppLink from "./appLink/AppLink";
import styles from "./PostPanel.module.css";

interface Props {
    post: Post;
}

const PostPanel = ({ post }: Props) => (
    <Card className={styles.PostPanel}>
        <div className={styles.Vote}>
            <ChevronUp size={22} className={styles.VoteSymbol} />
            <ChevronDown size={22} className={styles.VoteSymbol} />
        </div>
        <div className={styles.Content}>
            {/* {post.images === undefined || <img src={"/api/images" + post.image} />} */}
            <Title order={4}>{post.title}</Title>
            <Text className={styles.Text}>{post.content}</Text>
            <div className={styles.LinkWrapper}>
                <AppLink icon={<MessageSquare size={14} className={styles.Element} />} text="Comments" />
                <AppLink icon={<Link2 size={14} className={styles.Element} />} text="Share" />
                <AppLink icon={<Heart size={14} className={styles.Element} />} text="Favorite" />
            </div>
        </div>
    </Card>
);

export default PostPanel;
