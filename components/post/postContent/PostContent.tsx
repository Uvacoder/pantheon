import { Divider, Text, Title, TypographyStylesProvider } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { Heart, Link2, MessageSquare } from "react-feather";
import { Post } from "../../../database/entities/post";
import { sanitizeHTML } from "../../../utils/sanitize";
import Markup from "../../markup/Markup";
import AppLink from "../appLink/AppLink";
import styles from "./PostContent.module.css";

interface Props {
    post: Post;
    className: string;
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
    
const PostContent = ({ post, className }: Props) => (
    <div className={styles.Content}>
        <Text className={styles.Subtitle}>
            Posted by 
            {" "}
            <Link href={"/user/" + post.poster?.name}> 
                <span className={styles.NameLink}>
                    {post.poster?.name} 
                </span>
            </Link> 
            {" "}
            {getDisplay(post.createdAt)}
        </Text>
        <Title order={3} className={styles.Title}>
            {post.title}
        </Title>
        <Text className={className}>
            <TypographyStylesProvider>
                <Markup>
                    <div dangerouslySetInnerHTML={sanitizeHTML(post.content)} />
                </Markup>
            </TypographyStylesProvider>
        </Text>
        <div className={styles.LinkWrapper}>
            <AppLink 
                icon={<MessageSquare size={14}/>} 
                text={post.comments + " Comments"} 
                href="/" 
                onClick={e => e.preventDefault()}
            />
            <AppLink 
                icon={<Link2 size={14}/>} 
                text="Share" 
                href="/"
                onClick={e => e.preventDefault()}
            />
            <AppLink 
                icon={<Heart size={14}/>} 
                text="Favorite" 
                href="/"
                onClick={e => e.preventDefault()}
            />
        </div>
    </div>
);

export default PostContent;
