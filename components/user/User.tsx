import { Tab, Tabs } from "@mantine/core";
import React, { useState } from "react";
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
    initialSort: "new" | "top";
}

const User = ({ userData, initialSort }: Props) => {

    const [sort, setSort] = useState(initialSort);

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
                onChangeSort={setSort}
                initial={initialSort}
            />
            <Posts 
                sort={sort} 
                width={"calc(100% - 320px - 25px)"}
            />
            <UserPanel userData={userData} />
        </div>
    );
};

export default User;
