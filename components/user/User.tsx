import { Tab, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { SortType, TimeType } from "../../database/global";
import Posts from "../posts/Posts";
import SortOptions from "../sortOptions/SortOptions";
import styles from "./User.module.css";
import UserPanel from "./userPanel/UserPanel";

export interface UserData {
    name: string;
    userId: string;
    description: string;
    joined: string;
}

interface Props {
    userData: UserData;
    sort: SortType;
    time: TimeType;
    page: number;
}

const User = ({ userData, sort, time, page }: Props) => {

    const buildURL = (sort: SortType, time?: TimeType) => {
        let url = "/user/" + userData.name + "/" + sort + "";
        if (sort === "top" && time) {
            url += "?t=" + time;
        }
        return url;
    }

    return (
        <div className={styles.UserPanel}>
            <Tabs className={styles.Tabs}>
                <Tab label="Posts"></Tab>
                <Tab label="Comments"></Tab>
                <Tab label="Favorites"></Tab>
                <Tab label="Upvoted"></Tab>
                <Tab label="Downvoted"></Tab>
            </Tabs>
            <SortOptions
                sort={sort}
                time={time}
                buildURL={buildURL}
            />
            <Posts 
                sort={sort}
                time={time}
                page={page}
                user={userData.name}
                width={"calc(100% - 320px - 25px)"}
                buildURL={buildURL}
            />
            <UserPanel userData={userData} />
        </div>
    );
};

export default User;
