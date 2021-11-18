import { Card, Text, Title, TypographyStylesProvider } from "@mantine/core";
import dayjs from "dayjs";
import { sanitize } from "dompurify";
import Link from "next/link";
import React from "react";
import { ChevronDown, ChevronUp, Heart, Link2, MessageSquare } from "react-feather";
import { Post } from "../../../database/entities/post";
import { sanitizeHTML } from "../../../utils/sanitize";
import AppLink from "../appLink/AppLink";
import styles from "./PostPanel.module.css";

interface Props {
    post: Post;
}

function getDisplay(date: Date) {
    const dayJsDate = dayjs(date);
    const hours = dayjs().diff(dayJsDate, "hours");
    if(hours < 1) {
        return " now";
    } else if (hours < 24) {
        return hours + (hours > 1 ? " hours ago" : " hour ago");
    } else if(hours < 168) {
        const days = Math.floor(hours / 24);
        return days + (days > 1 ? " days ago" : " day ago");
    } else if (hours < 8760) {
        const months = Math.floor(hours / 730);
        return months + (months > 1 ? " months ago" : " month ago");
    } else {
        const years = Math.floor(hours / 8760);
        return years + (years > 1 ? " years ago" : " year ago");
    }
}
    
const PostPanel = ({ post }: Props) => (
    <Link href={"/post/" + post.id}>
        <Card className={styles.PostPanel}>
            <div className={styles.Vote}>
                <ChevronUp 
                    size={22} 
                    className={styles.VoteSymbol} 
                    onClick={e => e.preventDefault()}
                />
                <ChevronDown 
                    size={22} 
                    className={styles.VoteSymbol} 
                    onClick={e => e.preventDefault()}
                />
            </div>
            <div className={styles.Content}>
                <Text className={styles.Subtitle}>
                    Posted by {post.poster?.name} {getDisplay(post.createdAt)}
                </Text>
                <Title order={4}>{post.title}</Title>
                <Text className={styles.Text}>
                    <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={sanitizeHTML(post.content)} />
                    </TypographyStylesProvider>
                </Text>
                <div className={styles.LinkWrapper}>
                    <AppLink 
                        icon={<MessageSquare size={14} className={styles.Element} />} 
                        text="Comments" 
                        href="/" 
                        onClick={e => e.preventDefault()}
                    />
                    <AppLink 
                        icon={<Link2 size={14} className={styles.Element} />} 
                        text="Share" 
                        href="/"
                        onClick={e => e.preventDefault()}
                    />
                    <AppLink 
                        icon={<Heart size={14} 
                        className={styles.Element} />} 
                        text="Favorite" 
                        href="/"
                        onClick={e => e.preventDefault()}
                    />
                </div>
            </div>
        </Card>
    </Link>
);

export default PostPanel;
