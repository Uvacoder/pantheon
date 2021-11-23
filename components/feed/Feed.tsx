import { Card, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { SortType, TimeType } from "../../database/global";
import AppAvatar from "../appAvatar/AppAvatar";
import Posts from "../posts/Posts";
import SortOptions from "../sortOptions/SortOptions";
import Link from "next/link";
import styles from "./Feed.module.css";
import { getCookie } from "../cookie";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

function buildURL(sort: SortType, time?: TimeType) {
    let url = "/" + sort + "";
    if (sort === "top" && time) {
        url += "?t=" + time;
    }
    return url;
}

const Feed = ({ sort, time, page }: Props) => {

    const [name, setName] = useState<string>();

    useEffect(() => {
        const cookieData = getCookie();
        setName(cookieData?.name);
    });

    return (
        <div className={styles.Feed}>
            {!name ||
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
            }
            <SortOptions 
                sort={sort} 
                time={time} 
                buildURL={buildURL}
            />
            <Posts 
                sort={sort}
                time={time}
                width={"100%"}
                page={page}
                buildURL={buildURL}
            />
        </div>
    );
}

export default Feed;