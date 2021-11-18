import { Card, Input, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { SortType } from "../../database/global";
import AppAvatar from "../appAvatar/AppAvatar";
import Posts from "../posts/Posts";
import SortOptions from "../sortOptions/SortOptions";
import Link from "next/link";
import styles from "./Feed.module.css";

interface Props {
    category?: string;
    initialSort: SortType;
}

const Feed = ({ category, initialSort }: Props) => {

    const [sort, setSort] = useState(initialSort);

    return (
        <div className={styles.Feed}>
            <Card className={styles.Create}>
                <AppAvatar
                    width={40}
                    height={40}
                />
                <Link href="/submit">
                    <TextInput
                        className={styles.CreateInput}
                        placeholder="Create Post"
                        autoComplete="off"
                    />
                </Link>    
            </Card>
            <SortOptions
                onChangeSort={setSort}
                initial={initialSort}
            />
            <Posts 
                category={category} 
                sort={sort}
                width={"100%"}
            />
        </div>
    );
}

export default Feed;