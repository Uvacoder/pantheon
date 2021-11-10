import { Card, Tab, Tabs } from "@mantine/core";
import React, { ReactElement } from "react";
import SortOption from "./sortOption/SortOption";
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
    children: ReactElement;
}

const User = ({ userData, children }: Props) => (
    <div className={styles.UserPanel}>
        <Tabs className={styles.Tabs}>
            <Tab label="Posts"></Tab>
            <Tab label="Comments"></Tab>
            <Tab label="Favorites"></Tab>
            <Tab label="Upvoted"></Tab>
            <Tab label="Downvoted"></Tab>
        </Tabs>
        <Card className={styles.Sort}>
            <SortOption text="New" selected={true} />
            <SortOption text="Top" selected={false} />
        </Card>
        {children}
        <UserPanel userData={userData} />
    </div>
);

export default User;
